base_url = $("#baseURL").val();

//Pone la clase de arrastrar 
$(".sortable").nestedSortable({
  handle: "div",
  items: "li",
  toleranceElement: "> div",
});

//Pone la clase de arrastrar
$(".sortable").nestedSortable({
  disableParentChange: false,
  doNotClear: false,
  expandOnHover: 700,
  isAllowed: function () {
    return true;
  },
  isTree: false,
  listType: "ol",
  maxLevels: 0,
  protectRoot: false,
  rootID: null,
  rtl: false,
  startCollapsed: false,
  tabSize: 20,
  branchClass: "mjs-nestedSortable-branch",
  collapsedClass: "mjs-nestedSortable-collapsed",
  disableNestingClass: "mjs-nestedSortable-no-nesting",
  errorClass: "mjs-nestedSortable-error",
  expandedClass: "mjs-nestedSortable-expanded",
  hoveringClass: "mjs-nestedSortable-hovering",
  leafClass: "mjs-nestedSortable-leaf",
  disabledClass: "mjs-nestedSortable-disabled",
});

//AGREGA SUBMENÚ AL CONTENEDOR DE DETALLES
function agregar_submenu(){
    let select = $("#select_de_menus option:selected");
    let id = select.val();
    if(id!=="-1"){
      let inputURL = $("#inputURL").val();
      let textInputURL = $("#inputTextoURL").val();
      let contenedor_menu = $("#contenedor_menu");
      li = $("<li></li>");
      div = $("<div></div>");
      h6 = $("<h6></h6>");
      p = $("<p></p>");
      p.text("");
      p.attr("hidden",true);
      h6.text(textInputURL);
      h6.addClass("col-3");
      span = $("<span></span>");
      span.text(inputURL);
      span.addClass("col-9");
      span.addClass("text-right");
      div.append([h6,span,p]);
      div.addClass("contenido");
      div.addClass("ui-sortable-handle");
      div.addClass("d-flex");
      div.addClass("align-items-center");
      div.addClass("justify-content-around");
      li.append(div);
      contenedor_menu.append(li);
      guardar_menu();
    }else{
      if($("#alerta").hasClass("alert-success")){
        $("#alerta").removeClass("alert-success");
        $("#alerta").addClass("alert-danger");
      }  
      $("#alerta").text("Agregue un menú o seleccione uno");
      $("#alerta").removeAttr('hidden');
      $(document).ready(function () {
				window.setTimeout(function () {
					$("#alerta")
						.fadeTo(500, 0)
						.slideUp(1000, function () {
							$(this)[0].setAttribute("hidden",true);
              $(this).fadeTo(500,100);
						});
				}, 2000);
			});
    }
    $("#inputURL").val("");
    $("#inputTextoURL").val("");
}

//PONE VALORES EN EL SELECT DE LOS MENÚS
function select_menus() {
  $.ajax({
    url: base_url+"php/menus/select_menus.php",
    success: function (res) {
      let select_de_menus = $("#select_de_menus");
      select_de_menus.html("");
      let opcioninicial = $("<option value='-1' selected>Elige...</option>");
      select_de_menus.append(opcioninicial);
      if(res!="0"){
        let menus = JSON.parse(res);
        menus.forEach(menu => {
          let nuevaopcion = $("<option value='"+menu.IDMENU+"'>"+menu.NOMBRE+"</option>");
          select_de_menus.append(nuevaopcion);
        });
      }
    },
  });
}
select_menus();

//SE EJECUTA AL HACER EL CAMBIO DE ALGUN MENÚ
function elegir_select_menu(selecthtml) {
  let select = $("#select_de_menus option:selected");
  $("#nombre_menu").val(select.text());
  $("#input_id_menu").val(select.val());
  select_detalles_menu(select.val())
}

//CONTINUACIÓN DE LA ELECCIÓN DE ALGUN MENÚ
function select_detalles_menu(id) {
  $.ajax({
    data: { IDMENU: id },
    type: "POST",
    url: base_url+"php/menus/select_detalles_menu.php",
    success: function (res) {
      let contenedor_menu = $("#contenedor_menu");
      contenedor_menu.html("");
      if (res != 0) {
        let menus = JSON.parse(res);
        let lista;
        let div;
        let h6;
        let p;
        let span;
        let listaordenada;
        let nodoPadre = contenedor_menu;
        let nivelActual = 0;
        for (let i = 0; i < menus.length; i++) {
          div = $("<div></div>");
          h6 = $("<h6></h6>");
          p = $("<p></p>");
          p.text(menus[i].ICONO);
          p.attr("hidden",true);
          h6.text(menus[i].NOMBRE);
          h6.addClass("col-3");
          span = $("<span></span>");
          span.text(menus[i].ENLACE);
          span.addClass("col-9");
          span.addClass("text-right");
          div.attr("id",menus[i].IDDETALLE);
          div.append(h6);
          div.append(span);
          div.append(p);
          div.bind('click',function(){
            $("#input_id_detalle").val(menus[i].IDDETALLE);
            $("#input_nombre_detalle").val(menus[i].NOMBRE);
            $("#input_url_detalle").val(menus[i].ENLACE);
            $("#input_icono_detalle").val(menus[i].ICONO);
            $("#ModalEditarDetalleMenu").modal('show');
          });
          div.addClass("contenido");
          div.addClass("ui-sortable-handle");
          div.addClass("d-flex");
          div.addClass("align-items-center");
          div.addClass("justify-content-around");
          if (menus[i].NIVEL > nivelActual) {
            nodoPadre = lista;
            listaordenada = $("<ol></ol>");
            lista = $("<li></li>");
            lista.append(div);
            listaordenada.append(lista);
            nodoPadre.append(listaordenada);
            nodoPadre = listaordenada;
          } else if (menus[i].NIVEL < nivelActual) {
            for (let j = nivelActual; j > menus[i].NIVEL; j--) {
              nodoPadre = nodoPadre.parent().parent();
            }
            lista = $("<li></li>");
            lista.append(div);
            nodoPadre.append(lista);
          } else {
            lista = $("<li></li>");
            lista.append(div);
            nodoPadre.append(lista);
          }
          nivelActual = menus[i].NIVEL;
        }
        $(document).ready(function () {
          recorrer_contendor_menu();
        });
      }
    },
  });
}

//SE EJECUTA AL DAR GUARDAR EN EL MODAL DE ALGÚN DETALLE
function modificar_detalle(){
  let id = $("#input_id_detalle").val();
  let nombre = $("#input_nombre_detalle").val();
  let url = $("#input_url_detalle").val();
  let icono = $("#input_icono_detalle").val();
  $.ajax({
    data: {IDDETALLE: id, NOMBRE: nombre, ENLACE:url, ICONO:icono},
    type: "POST",
    url: base_url+"php/menus/modificar_detalle.php",
    success: function(res){
      select_detalles_menu($("#input_id_menu").val());
      $("#ModalEditarDetalleMenu").modal('hide');
      llenarSubMenusNav();
    }
  })
}

//LLENA EL NAVBAR DEPENDIENDO DE QUIEN ESTE EN LA SESIÓN
function llenarSubMenusNav(){
  $.ajax({
    data: {IDUSER: sess},
    type: "POST",
    url: base_url+"php/menus/select_menus_user.php",
    success: function(res){
      let detalles_menus = JSON.parse(res);
      let nav = $("#navMenus");
      nav.html("");
      llenarNav(nav,detalles_menus);
    }
  })
}
llenarSubMenusNav();

//CONTINUACIÓN DEL LLENADO DEL NAVBAR
function llenarNav(nav,subMenus){
  let lista;
  let icon;
  let p;
  let a;
  let listaNoOrdenada;
  let nodoPadre = nav;
  let nivelActual = 0;
  for (let i = 0; i < subMenus.length; i++) {
    p = $("<p></p>");
    p.addClass("pl-3");
    a = $("<a></a>");
    icon = $("<i></i>");
    if(subMenus[i].ENLACE==null){
      a.attr("href","#");
    }else{
      a.attr("href",subMenus[i].ENLACE);
    }
    if(subMenus[i].ICONO!=null){  
      let arrayC = subMenus[i].ICONO.split(" ");
      icon.addClass(arrayC[0]);
      icon.addClass(arrayC[1]);
    }
    p.text(subMenus[i].NOMBRE);
    a.addClass("nav-link");
    a.addClass("d-flex");
    a.addClass("align-items-center");
    a.append(icon);
    a.append(p);
    if (subMenus[i].NIVEL > nivelActual) {
      nodoPadre = lista;
      let iconoPadre = $("<i></i>");
      iconoPadre.addClass("fas");
      iconoPadre.addClass("fa-angle-left");
      iconoPadre.addClass("right");
      nodoPadre.children().append(iconoPadre);
      listaNoOrdenada = $("<ul></ul>");
      listaNoOrdenada.addClass("nav");
      listaNoOrdenada.addClass("nav-treeview");
      lista = $("<li></li>");
      lista.addClass("nav-item");
      lista.append(a);
      listaNoOrdenada.append(lista);
      nodoPadre.append(listaNoOrdenada);
      nodoPadre = listaNoOrdenada;
    } else if (subMenus[i].NIVEL < nivelActual) {
      for (let j = nivelActual; j > subMenus[i].NIVEL; j--) {
        nodoPadre = nodoPadre.parent().parent();
      }
      lista = $("<li></li>");
      lista.addClass("nav-item");
      lista.append(a);
      nodoPadre.append(lista);
    } else {
      lista = $("<li></li>");
      lista.addClass("nav-item");
      lista.append(a);
      nodoPadre.append(lista);
    }
    nivelActual = subMenus[i].NIVEL;
  }

}

//INSERTA NUEVO MENÚ
function insert_menu(){
  let nombre_menu = $("#input_nombre_menu").val();
  let fecha = moment().format('YYYY-MM-DD HH:mm:ss');
  $.ajax({
    type: "POST",
    data: { NOMBRE: nombre_menu, FECHA: fecha },
    url: base_url+"php/menus/insert_menu.php",
    success: function (res) {
      select_menus()
      $("#input_nombre_menu").val("");
      $("#alerta").text("Se ha agregado correctamente el menú");
      $("#alerta").removeAttr('hidden');
      $(document).ready(function () {
				window.setTimeout(function () {
					$("#alerta")
						.fadeTo(500, 0)
						.slideUp(1000, function () {
							$(this)[0].setAttribute("hidden",true);
              $(this).fadeTo(500,100);
						});
				}, 2000);
			});
    },
  });
}

function guardar_menu(){
  let select = $("#select_de_menus option:selected");
  let id = select.val();
  if(id!="-1"){
    borrar_menu(id);
  }
}

//Borra los menus anteriores
function borrar_menu(id) {
  $.ajax({
    type: "POST",
    data: { IDMENU: id },
    url: base_url+"php/menus/delete_detalles_menu.php",
    success: function (res) {
      recorrer_contendor_menu();
      insert_detalles_menu(dicc);
    },
  }); 
}

var dicc = [];
//Recorrido de arbol de submenús
function recorrer_contendor_menu() {
  let contenedor_menu = $("#contenedor_menu")[0];
  let nivel = 0;
  dicc = [];
  recorrido_arbol(contenedor_menu, nivel);

  function recorrido_arbol(contenedor, nivel) {
    let nodos_hijos = contenedor.children;
    para_hijos(nodos_hijos, nivel);
  }
  
  function para_hijos(nodos_hijos, nivel) {
    for (let i = 0; i < nodos_hijos.length; i++) {
      let nodo = nodos_hijos[i];
      mostrar_hijo(nodo, nivel);
      nodo.children && recorrido_arbol(nodo, nivel + 1);
    }
  }
  
  function mostrar_hijo(nodo, nivel) {
    let nivelNodo;
    if (nodo.tagName === "LI" || nodo.tagName === "OL") {
      if (nodo.tagName != "OL") {
        nivelNodo = nivel;
        if (nivelNodo > 0) {
          nivelNodo = Math.round(nivelNodo / 2);
          dicc.push([
            nodo.childNodes[0].childNodes[0].innerText,
            nodo.childNodes[0].childNodes[1].innerText,
            nodo.childNodes[0].childNodes[2].innerText,
            nivelNodo
          ]);
        } else {
          dicc.push([
            nodo.childNodes[0].childNodes[0].innerText,
            nodo.childNodes[0].childNodes[1].innerText,
            nodo.childNodes[0].childNodes[2].innerText,
            nivelNodo
          ]);
        }
      }
    }
  }
}



//Inserta los valores de los menus
function insert_detalles_menu(dicc) {
  let select = $("#select_de_menus option:selected");
  let id = select.val();
  $.ajax({
    type: "POST",
    data: { IDMENU: id, arrayM: dicc },
    url: base_url+"php/menus/insert_detalles_menu.php",
    success: function (res) {
      select_detalles_menu(id);
      llenarSubMenusNav();  
    },
  });
}

$("#input_nombre_menu").on('keyup', function (e) {
  if (e.keyCode===13) {
    insert_menu();
  }
});

$("#inputURL").on('keyup', function (e) {
  if (e.keyCode===13) {
    $("#inputTextoURL").focus();
  }
});

$("#inputTextoURL").on('keyup', function (e) {
  if (e.keyCode===13) {
    agregar_submenu();
  }
});