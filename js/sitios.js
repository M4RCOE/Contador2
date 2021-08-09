base_url = $("#baseURL").val();
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCFMa4pd7uMEU0NRi7dHS7YVBcFQvKG5Ow&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 19.24997, lng: -103.72714},
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();
  $("#map").attr('style',"height:300px; overflow:hidden;");
  const locationButton = document.createElement("button");
  locationButton.textContent = "Ir a mi ubicación";
  locationButton.classList.add("custom-map-control-button");
  locationButton.classList.add("btn");
  locationButton.classList.add("btn-primary");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    locationButton
  );
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Localización encontrada");
          infoWindow.open(map);
          map.setCenter(pos);
          document.getElementById("inputUbicacionSitio").value =
            "Latitud:" + pos.lat + " Longitud:" + pos.lng;
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
      $("#inputContactoSitio").focus();
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// Append the 'script' element to 'head'
document.head.appendChild(script);

$("#inputNombreSitio").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputClienteSitio").focus();
    }
});

$("#inputClienteSitio").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputDomicilioSitio").focus();
    }
});

$("#inputClienteSitio").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputDomicilioSitio").focus();
    }
});

$("#inputDomicilioSitio").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputDescripcionSitio").focus();
    }
});

$("#inputContactoSitio").on('keyup', function (e) {
    if (e.keyCode===13) {
        $("#inputTelefonoSitio").focus();
    }
});

$("#inputTelefonoSitio").on('keyup', function (e) {
    if (e.keyCode===13) {
        anade_sitio();
    }
});

function select_sitios(){
    $.ajax({
        url: base_url+"php/sitios/select_sitios.php",
        success: function (res) {
          if(res!="0"){
            if($("#tablaSitios").attr('class').includes("dataTable")) {
                $("#tablaSitios").DataTable().clear().destroy();
            }
            let cuerpoTabla = $("#cuerpoTablaSitio");
            cuerpoTabla.html("");
            let sitios = JSON.parse(res);
            let row;
            let nombre;
            let descripcion;
            let cliente;
            let domicilio;
            let ubicacion;
            let contacto;
            let telefono;
            sitios.forEach((s) => {
                row = $("<tr class='text-center'></tr>");
                nombre = $("<td></td>");
                nombre.text(s.NOMBRE);
                descripcion = $("<td></td>");
                if (s.DESCRIPCION === null || s.DESCRIPCION === "") {
                  descripcion.text("--");
                } else {
                  descripcion.text(s.DESCRIPCION);
                }
                cliente = $("<td></td>");
                cliente.text(s.CLIENTE);
                domicilio = $("<td></td>");
                domicilio.text(s.DOMICILIO);
                ubicacion = $("<td></td>");
                ubicacion.text(s.UBICACIONGPS);
                contacto = $("<td></td>");
                contacto.text(s.CONTACTO);
                telefono = $("<td></td>");
                telefono.text(s.TELEFONO);
                row.append(nombre);
                row.append(descripcion);
                row.append(cliente);
                row.append(domicilio);
                row.append(ubicacion);
                row.append(contacto);
                row.append(telefono);
                cuerpoTabla.append(row);
              });
            }
            $("#tablaSitios").DataTable({
                language: {
                  url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
                },
            });
        },
    });
}
select_sitios();

function anade_sitio() {
    let nombre = $("#inputNombreSitio").val();
    let descripcion = $("#inputDescripcionSitio").val();
    let cliente = $("#inputClienteSitio").val();
    let domicilio = $("#inputDomicilioSitio").val();
    let ubicacion = $("#inputUbicacionSitio").val();
    let contacto = $("#inputContactoSitio").val();
    let telefono = $("#inputTelefonoSitio").val();
    let fechacaptura = moment().format('YYYY-MM-DD HH:mm:ss');
    $.ajax({
        url: base_url+"php/sitios/insert_sitio.php",
        data: {nombre: nombre,descripcion: descripcion,cliente: cliente,domicilio: domicilio,ubicacion: ubicacion,contacto: contacto,telefono: telefono,fecha: fechacaptura},
        type: "POST",
        success: function (res) {
          borrar_inputs_sitio();
          select_sitios();
        },
    });
  }

  function borrar_inputs_sitio(){
    $("#inputNombreSitio").val("");
    $("#inputDescripcionSitio").val("");
    $("#inputClienteSitio").val("");
    $("#inputDomicilioSitio").val("");
    $("#inputUbicacionSitio").val("");
    $("#inputContactoSitio").val("");
    $("#inputTelefonoSitio").val("");
  }