base_url = $("#baseURL").val();

function select_categorias() {
    $.ajax({
      url: base_url+"php/categorias/select_categorias.php",
      success: function (res) {
        if (res != "0") {
          if($("#tablaCategorias").attr('class').includes("dataTable")) {
            $("#tablaCategorias").DataTable().clear().destroy();
          }
          cuerpoTabla = $("#cuerpoTablaCategoria");
          cuerpoTabla.html("");
          let categorias = JSON.parse(res);
          let row;
          let nombre;
          let descripcion;
          let slug;
          let cantidad;
          categorias.forEach((c) => {
            row = $("<tr class='text-center'></tr>");
            nombre = $("<td></td>");
            nombre.text(c.NOMBRE);
            descripcion = $("<td></td>");
            if (c.DESCRIPCION === null) {
              descripcion.text("--");
            } else {
              descripcion.text(c.DESCRIPCION);
            }
            slug = $("<td></td>");
            slug.text(c.SLUG);
            cantidad = $("<td></td>");
            cantidad.text(c.CANTIDAD);
            row.append(nombre);
            row.append(descripcion);
            row.append(slug);
            row.append(cantidad);
            cuerpoTabla.append(row);
          });
        }

        $("#tablaCategorias").DataTable({
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
          },
        });
      },
    });
  }
select_categorias();
  

$("#inputNombreCategoria").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputSlugCategoria").focus();
    }
});

$("#inputSlugCategoria").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputDescripcionCategoria").focus();
    }
});

$("#inputDescripcionCategoria").on('keyup', function (e) {
    if (e.keyCode===13) {
        insert_categoria();
    }
});

function insert_categoria() {
    let nombre = $("#inputNombreCategoria").val();
    let slug = $("#inputSlugCategoria").val();
    let descripcion = $("#inputDescripcionCategoria").val();
    let fechacaptura = moment().format('YYYY-MM-DD HH:mm:ss');
    $.ajax({
        url: base_url+"php/categorias/insert_categoria.php",
        data: {nombre: nombre,slug: slug,descripcion: descripcion,fecha: fechacaptura},
        type: "POST",
        success: function (res) {
            console.log(res);
          borrarCamposInput();
          select_categorias();
        },
    });
}

function borrarCamposInput(){
    $("#inputNombreCategoria").val("");
    $("#inputSlugCategoria").val("");
    $("#inputDescripcionCategoria").val("");
}