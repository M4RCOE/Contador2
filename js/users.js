var menus;

function select_users() {
	$.ajax({
		url: base_url + "php/usuarios/select_users.php",
        beforeSend: function () {
            
        },
        complete: function () {
            
        },
		success: function (res) {
			if(res!="0"){
                let users = JSON.parse(res);
                let bodytablausers = $("#tableUsersMenuBody");
                bodytablausers.html("");
                
                users.forEach(user => {
                    let tr = $("<tr id='FILAUSER"+user.IDUSER+"' class='datos_user_servicio' data-toggle='modal' data-id='USER"+user.IDUSER+"' data-target='#MODALUSER"+user.IDUSER+"'></tr>");
                    let id = $("<td id='IDUSER"+user.IDUSER+"' style='font-size:16px; font-weight:bold;'>"+user.IDUSER+"</td>");
                    let foto = $("<td id='IMGUSER"+user.IDUSER+"'><img class='rounded-circle' src='"+base_url+user.FOTO+"' width='55px'/></td>");
                    let nombre = $("<td id='NOMBREUSER"+user.IDUSER+"' style='font-size:16px; font-weight:bold;'>"+user.NOMBRE+" "+user.APELLIDOS+"</td>");              
                    let username = $("<td id='USERNAMEUSER"+user.IDUSER+"' style='font-size:16px; font-weight:bold;'>"+user.USERNAME+"</td>");
                    let email = $("<td id='EMAILUSER"+user.IDUSER+"'style='font-size:16px; font-weight:bold;' >"+user.EMAIL+"</td>");
                    let menutd = $("<td style='text-align:left; font-size:16px; padding-top:15px;'></td>");
                    let menuselect = $("<select id='SELECTMENUUSER"+user.IDUSER+"' class='form-select'style='width:116px;' onchange=''></select>");
                    menuselect.change(function(){
                        select_menu_user(user.IDUSER);
                        poner_user_menu(user.IDUSER,this.value);
                    });
                    let opcioninicial = $("<option value='-1' selected>Elige...</option>");
                    menuselect.append(opcioninicial);
                    function llenar_select_menus_tabla(){
                        $.ajax({
                            url: base_url+"php/menus/select_menus.php",
                            success: function (res) {
                                if(res!="0"){
                                    let menus = JSON.parse(res);
                                    menus.forEach(menu =>{
                                        if(menu.IDUSER===user.IDUSER){
                                            menuselect.append("<option value='"+menu.IDMENU+"' selected>"+menu.NOMBRE+"</option>");
                                        }else{
                                            menuselect.append("<option value='"+menu.IDMENU+"'>"+menu.NOMBRE+"</option>");
                                        }                             
                                    });
                                }             
                            }
                        });
                    }
                    llenar_select_menus_tabla();
                    let botones = $("<td name='botones' style='text-align:right' value='botones'></td>");
                    let divbotones = $("<div class='d-flex justify-content-between'></div>");
                    let botonborrar = $("<button class='btn btn-danger rounded-circle border border-2 border-dark ml-1' id='boton_borrar_"+user.IDUSER+"' style='width:45px; height:45px; font-size:16px;'><i class='fas fa-trash-alt'></i></button>");
                    let botoneditar = $("<button class='btn btn-primary rounded-circle border border-2 border-dark mr-1' id='boton_editar_"+user.IDUSER+"' style='width:45px; height:45px; font-size:16px;'><i class='fas fa-user-edit'></i></button>");
                    botonborrar.bind('click',function(){
                        $("#idBorrar").val(user.IDUSER);
                        $("#borrarModal").modal('show');
                    });
                    botoneditar.bind('click',function(){
                        $("#imagenRecienSubidaEditar").attr("src",base_url+user.FOTO);
                        $("#editarUserID").val(user.IDUSER);
                        $("#editarNombreUser").val(user.NOMBRE);
                        $("#editarApellidos").val(user.APELLIDOS);
                        $("#editarUser").val(user.USERNAME);
                        $("#editarCorreo").val(user.EMAIL);
                        $("#editarContraseña").val(user.PASSWORD);
                        $("#editarNIPUser").val(user.NIP);
                        $("#editarModal").modal('show');
                    });

                    divbotones.append([botoneditar,botonborrar]);
                    botones.append(divbotones);
                    
                    menutd.append(menuselect);
                    tr.append([id,foto,nombre,username,email,menutd,botones]);
                    bodytablausers.append(tr);
                });
            }
		},
	});
}
select_users();


function llenar_select_menus_tabla(){
    $.ajax({
        url: base_url+"php/menus/select_menus.php",
        success: function (res) {
            if(res!="0"){
                let menus = JSON.parse(res);
                menus.forEach(menu =>{
                    menuselect.append("<option value='"+menu.IDMENU+"'>"+menu.NOMBRE+"</option>");
                });
            }             
        }
    });
}

function subir_foto_servidor(){
    let img = $("#insertFoto")[0].files[0];
    let formData = new FormData();
    let fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.append('fecha',fecha);
    formData.append('file',img);
    insert_archivo(formData);
}


function editar_foto_servidor(){
    let img = $("#editarFoto")[0].files[0];
    let formData = new FormData();
    let fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.append('fecha',fecha);
    formData.append('file',img);
    insert_archivo(formData);
}

function insert_archivo(formData){
    $.ajax({
      data: formData,
      type: "POST",
      contentType:false,
      processData:false,
      url: base_url+"php/archivos/insert_archivo.php",
      success: function(res){
        console.log(res);
        function select_ultimo_archivo(){
            $.ajax({
                url: base_url+"php/archivos/select_ultimo_subido.php",
                success: function(res){
                    if(res!="0"){
                        let archivo = JSON.parse(res)[0];
                        $("#imagenRecienSubida").attr("src",base_url+"archivos/"+archivo.NOMBRE+archivo.EXTENSION);
                        $("#imagenRecienSubidaEditar").attr("src",base_url+"archivos/"+archivo.NOMBRE+archivo.EXTENSION);
                    }
                }
            })
        }
        select_ultimo_archivo();
      }
    })
}

function abrir_modal_insert_usuario(){
    $("#imagenRecienSubida").attr("src",base_url+"img/sin_foto.png");
    $("#insertarModal").modal('show');
}

function agregar_usuario(){
    let nombre = $("#insertNombreUser").val();
    let apellidos = $("#insertApellidos").val();
    let user = $("#insertUser").val();
    let correo = $("#insertCorreo").val();
    let pass = $("#insertContraseña").val();
    let nip = $("#insertNIPUser").val();
    let img = $("#insertFoto")[0].files[0];
    let formData = new FormData();
    formData.append('nombre',nombre);
    formData.append('apellidos',apellidos);
    formData.append('username',user);
    formData.append('email',correo);
    formData.append('password',pass);
    formData.append('nip',nip);
    formData.append('tipo',2);
    formData.append('file',img);
    insert_usuario(formData);
}

//Inserción de un usuario a base de datos
function insert_usuario(formData){
    $.ajax({
      data: formData,
      type: "POST",
      contentType:false,
      processData:false,
      url: base_url+"php/usuarios/insert_user.php",
      success: function(res){
        $("#insertarModal").modal('hide');
        if(!$("#alerta").hasClass("alert-success")){
            $("#alerta").removeClass("alert-danger");
            $("#alerta").addClass("alert-success");
        }  
        $("#alerta").text("Se ha INSERTADO correctamente el usuario");
        $("#alerta").removeAttr('hidden');
        $(document).ready(function () {
            window.setTimeout(function () {
                $("#alerta")
                    .fadeTo(500, 0)
                    .slideUp(1000, function () {
                        $(this).attr("hidden",true);
                        $(this).fadeTo(500,100);
                    });
            }, 2000);
        });
        select_users();
      }
    })
  }

function select_menu_user(id){
    $.ajax({
        data: {id: id},
        type: "POST",
        url: base_url+"php/usuarios/select_menu_user.php",
        success: function(res){
            let menus = JSON.parse(res);
            quitar_menu_user(menus[0].IDMENU);
        }
    })
}

function quitar_menu_user(id_menu){
    $.ajax({
        data: {id: id_menu},
        type: "POST",
        url: base_url+"php/usuarios/quitar_user_menu.php",
        success: function(res){
    
        }
    })
}

function poner_user_menu(id_user,id_menu){
    $.ajax({
      data: {iduser: id_user, idmenu: id_menu},
      type: "POST",
      url: base_url+"php/usuarios/poner_user_menu.php",
      success: function(res){
        if(!$("#alerta").hasClass("alert-success")){
            $("#alerta").removeClass("alert-danger");
            $("#alerta").addClass("alert-success");
        }  
        $("#alerta").text("Se han guardado correctamente los cambios");
        $("#alerta").removeAttr('hidden');
        $(document).ready(function () {
            window.setTimeout(function () {
                $("#alerta")
                    .fadeTo(500, 0)
                    .slideUp(1000, function () {
                        $(this).attr("hidden",true);
                        $(this).fadeTo(500,100);
                });
            }, 2000);
        });
        llenarSubMenusNav()
      }
    })
  }

  function borrar_usuario(){
    let id = $("#idBorrar").val();
    $.ajax({
      data: {id: id},
      type: "POST",
      url: base_url+"php/usuarios/borrar_user.php",
      success: function(res){
        if(!$("#alerta").hasClass("alert-success")){
            $("#alerta").removeClass("alert-danger");
            $("#alerta").addClass("alert-success");
        } 
        $("#borrarModal").modal('hide');
        $("#alerta").text("Se ha BORRADO correctamente el usuario");
        $("#alerta").removeAttr('hidden');
        $(document).ready(function () {
            window.setTimeout(function () {
                $("#alerta")
                    .fadeTo(500, 0)
                    .slideUp(1000, function () {
                        $(this).attr("hidden",true);
                        $(this).fadeTo(500,100);
                          });
                  }, 2000);
              });
        select_users();
      }
    })
  }

function actualizar_usuario(){
    let id = $("#editarUserID").val();
    let nombre = $("#editarNombreUser").val();
    let apellidos = $("#editarApellidos").val();
    let user = $("#editarUser").val();
    let correo = $("#editarCorreo").val();
    let pass = $("#editarContraseña").val();
    let nip = $("#editarNIPUser").val();
    let img = $("#editarFoto")[0].files[0];
    
    let formData = new FormData();
    formData.append('id',id);
    formData.append('nombre',nombre);
    formData.append('apellidos',apellidos);
    formData.append('username',user);
    formData.append('email',correo);
    formData.append('password',pass);
    formData.append('nip',nip);
    formData.append('tipo',2);
    formData.append('file',img);
    update_user(formData);
}

function update_user(formData){
    $.ajax({
        data: formData,
        type: "POST",
        contentType:false,
        processData:false,
        url: base_url+"php/usuarios/update_user.php",
        success: function(res){
            if(!$("#alerta").hasClass("alert-success")){
                $("#alerta").removeClass("alert-danger");
                $("#alerta").addClass("alert-success");
            } 
            $("#editarModal").modal('hide');
            $("#alerta").text("Se ha EDITADO correctamente el usuario");
            $("#alerta").removeAttr('hidden');
            $(document).ready(function () {
                window.setTimeout(function () {
                    $("#alerta")
                        .fadeTo(500, 0)
                        .slideUp(1000, function () {
                            $(this).attr("hidden",true);
                            $(this).fadeTo(500,100);
                              });
                      }, 2000);
                  });
            select_users();
        }
    })
}
