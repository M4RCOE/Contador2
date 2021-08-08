//OBTIENE VALOR DEL BASE_URL
base_url = $("#baseURL").val();

//INICIALIZACIÓN DE CRONOMETROS
function inicializar_cronometros(){
    $.ajax({
        url: base_url+"php/users/select_users_servicio.php",
        success: function(res){
            let users_servicio = JSON.parse(res);
            users_servicio.forEach(user => {
                cronometros[user.IDUSER] = 0;
		        timeouts[user.IDUSER] = 0;
            });
        }
    });
}
inicializar_cronometros()

//PETICION SELECT * FROM APP_USERS WHERE IDTIPO=2
function select_users_servicio(){
    $.ajax({
        url: base_url+"php/users/select_users_servicio.php",
        success: function(res){
            let users_servicio = JSON.parse(res);
            let body_tabla_users_servicio = $("#bodyTablaUsersServicio");
            users_servicio.forEach(user => {
                //Creación de fila de usuario de servicio
                let tr = $("<tr id='FILAUSER"+user.IDUSER+"' class='datos_user_servicio' data-toggle='modal' data-id='USER"+user.IDUSER+"' data-target='#MODALUSER"+user.IDUSER+"'></tr>");
                let id = $("<td id='IDUSER"+user.IDUSER+"' hidden>"+user.IDUSER+"</td>");
                let foto = $("<td id='IMGUSER"+user.IDUSER+"'><img class='rounded-circle' src='"+base_url+user.FOTO+"' width='55px'/></td>");
                let nombre = $("<td id='NOMBREUSER"+user.IDUSER+"' style='font-size:20px; font-weight:bold;'>"+user.NOMBRE+" "+user.APELLIDOS+"<br>"+
                                    "<p class='d-inline' style='font-size:18px; font-weight:normal; color:grey;'> Horas semana: </p><p class='d-inline' style='font-size:18px; font-weight:normal; color:grey;' id='HORASSEMANALESUSER"+user.IDUSER+"'>0</p>"+
                                    "<p class='d-inline' style='font-size:18px; font-weight:normal; color:grey;'>  Actualmente: </p><p class='d-inline' style='font-size:18px; font-weight:normal; color:grey;' id='TIEMPOACTUALUSER"+user.IDUSER+"'>00:00:00</p>"+
                                "</td>");              
                let username = $("<td id='USERNAMEUSER"+user.IDUSER+"' hidden>"+user.USERNAME+"</td>");
                let email = $("<td id='EMAILUSER"+user.IDUSER+"'style='font-size:20px; font-weight:bold;' >"+user.EMAIL+"</td>");
                let botones = $("<td id='BOTONESUSER"+user.IDUSER+"'></td>");
                let botonContinuar = $("<input class='btn btn-success m-1 rounded-pill border border-2 border-dark' id='CONTINUARUSER"+user.IDUSER+"' style='width:105px; font-size:18px;' value='Continuar' hidden/>");
                let botonCandado = $("<input class='btn btn-secondary m-1 rounded-circle border border-2 border-dark' id='CANDADOUSER"+user.IDUSER+"' style='width:50px; height:50px; font-size:18px;' value='🔒' hidden/>");
                let botonPrincipal = $("<input class='btn btn-success m-1 rounded-pill border border-2 border-dark' id='INICIARUSER"+user.IDUSER+"' style='width:105px; font-size:18px;' value='Iniciar'/>");
                //Asignación onclick a botones
                botonPrincipal.bind('click',function(){
                    accion_boton_iniciar(this)
                });
                botonCandado.bind('click',function(){
                    accion_boton_candado(this)
                });
                botonContinuar.bind('click',function(){
                    accion_boton_continuar(this)
                });
                
                //Asignación de onclick a columnas
                nombre.bind('click',function(){
                    $("#MODALUSER"+user.IDUSER).modal('show')
                });
                email.bind('click',function(){
                    $("#MODALUSER"+user.IDUSER).modal('show')
                });
                //Agrega los hijos
                tr.append(id);
                tr.append(foto);
                tr.append(nombre);
                tr.append(username);
                tr.append(email);
                botones.append(botonContinuar);
                botones.append(botonCandado);
                botones.append(botonPrincipal);
                tr.append(botones);
                body_tabla_users_servicio.append(tr);
                //Crea el modal del usuario de servicio
                creacion_modal_user_servicio(user);
                select_tareas_user(user.IDUSER);
            });
            select_contadores_iniciados();
            inicializar_graficas();    
        }
    })
}
select_users_servicio();

//CREA MODAL DE USUARIO DE SERVICIO
function creacion_modal_user_servicio(user){
    let modal = $("<div class='modal fade bd-example-modal-lg' id='MODALUSER"+user.IDUSER+"' tabindex='-1' aria-labelledby='MODALLABEL"+user.IDUSER+"' aria-hidden='true'></div>")
    let modaldialog = $("<div class='modal-dialog modal-lg modal-dialog-centered'></div>");
    let modalcontent = $("<div class='modal-content'></div>");
    let modalheader = $("<div class='modal-header'></div>");
    let h5modalheader = $("<h5 class='modal-title col-11 text-center' id='MODALLABEL"+user.IDUSER+"'></h5>");
    let buttonmodalheader = $("<button type='button' class='btn-close col' data-bs-dismiss='modal' aria-label='Close'></button>");
    modalheader.append(h5modalheader);
    modalheader.append(buttonmodalheader);
    let modalbody = $("<div class='modal-body d-flex justify-content-between align-items-center flex-column text-center'></div>");
    let navtabsmodalbody = $("<div class='nav nav-tabs' id='nav-tab-"+user.IDUSER+"' role='tablist'></div>");
    let tab1 = $("<a class='nav-link active' id='nav-tareas-tab-"+user.IDUSER+"' data-bs-toggle='tab' href='#nav-tareas-"+user.IDUSER+"' role='tab' aria-controls='nav-tareas' aria-selected='true'>Tareas</a>");
    let tab2 = $("<a class='nav-link' id='nav-dia-tab-"+user.IDUSER+"' data-bs-toggle='tab' href='#nav-dia-"+user.IDUSER+"' role='tab' aria-controls='nav-dia' aria-selected='false'>Día</a>");
    let tab3 = $("<a class='nav-link' id='nav-semana-tab-"+user.IDUSER+"' data-bs-toggle='tab' href='#nav-semana-"+user.IDUSER+"' role='tab' aria-controls='nav-semana' aria-selected='false'>Semana</a>");
    navtabsmodalbody.append(tab1);
    navtabsmodalbody.append(tab2);
    navtabsmodalbody.append(tab3);
    let tabcontents = $("<div class='tab-content'></div>");

    //Creación de sección de tareas
    let tabcontenttareas = $("<div class='tab-pane fade show active' id='nav-tareas-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-tareas-tab'></div>")
    let contenedortareas = $("<div style='width:800px; height:400px'></div>");
    let contenedortareas2 = $("<div class='d-flex justify-content-center p-0 m-0' style='width: 800px; height:500px'></div>");
    let contenedortareas3 = $("<div class='d-flex flex-column' style='width: 290px; height: 500px'></div>");
    let h2nuevatarea = $("<h2 class='pt-3 pb-3 text-primary'>Nueva Tarea</h2>");
    let contenedorformulariotarea = $("<div class='d-flex flex-column justify-content-center align-items-center'></div>");
    let contenedorformulariotarea2 = $("<div class='d-flex flex-column justify-content-around' style='width: 240px'></div>");
    let inputidusertarea = $("<input id='INPUTIDUSER"+user.IDUSER+"' type='text' value='"+user.IDUSER+"' hidden/>");
    let inputtarea = $("<textarea id='TAREA"+user.IDUSER+"' type='text' style='width:90%'></textarea>");
    let inputfechatarea = $("<input id='FECHA"+user.IDUSER+"' type='text' value='"+moment().format('YYYY-MM-DD')+"' hidden/>");
    let inputestadotarea = $("<input id='ESTADO"+user.IDUSER+"' type='text' value='"+1+"' hidden/>");
    let divboton = $("<div class='text-center d-flex align-items-center'></div>");
    let botonagregartarea = $("<button class='rounded-circle' onclick='' style='width: 30px; height: 30px'>+</button>");
    botonagregartarea.bind('click',function(){
        insertar_nueva_tarea(user.IDUSER);
    });
    let divcalendario = $("<div class='d-flex justify-content-center pb-3'></div>");
    let divdatepicker = $("<div id='CALENDARIONUEVATAREA"+user.IDUSER+"' class='d-flex justify-content-center' style='width:100px'></div>");
    //Inicialización DatePicker
    divdatepicker.datepicker({
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 100);
            }, 0);
        },
        onSelect: function(date){
            let data = new Date(date);
            inputfechatarea.val(data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate());
        }
    }).show()

    //Agrega elementos a sección nuevas tareas
    contenedorformulariotarea2.append(inputidusertarea);
    contenedorformulariotarea2.append(inputfechatarea);
    contenedorformulariotarea2.append(inputestadotarea);
    divboton.append(inputtarea);
    divboton.append(botonagregartarea);
    contenedorformulariotarea2.append(divboton);
    divcalendario.append(divdatepicker);
    contenedorformulariotarea2.append(divcalendario);
    contenedorformulariotarea.append(contenedorformulariotarea2);
    contenedortareas3.append(h2nuevatarea);
    contenedortareas3.append(contenedorformulariotarea);
    contenedortareas2.append(contenedortareas3);
    contenedortareas.append(contenedortareas2);
    tabcontenttareas.append(contenedortareas);

    //Creación elementos a sección tareas
    let divcontenedorscciontareas = $("<div class='text-center' style='width: 450px; height:500px;'></div>");
    let divcontenedorscciontareas2 = $("<div class='d-flex justify-content-center align-items-center'></div>");
    let h2tareas = $("<h2 class='pt-3 pb-5 text-primary' style='width: 400px; height:50px;'> Tareas</h2>");
    let divtabstareas = $("<div class='d-flex flex-column justify-content-start align-items-center overflow-auto' style='width:100%; height:450px;'></div>");
    let divnavtabtareas = $("<div class='nav nav-tabs' id='nav-tab' role='tablist'>");
    let tabtareas1 = $("<a class='nav-link active' id='nav-activa-tab-"+user.IDUSER+"' data-bs-toggle='tab' data-bs-target='#nav-activa-"+user.IDUSER+"' type='button' role='tab' aria-controls='nav-activa-"+user.IDUSER+"' aria-selected='true'>Activa</a>");
    let tabtareas2 = $("<a class='nav-link' id='nav-cancelada-tab-"+user.IDUSER+"' data-bs-toggle='tab' data-bs-target='#nav-cancelada-"+user.IDUSER+"' type='button' role='tab' aria-controls='nav-cancelada-"+user.IDUSER+"' aria-selected='true'>Cancelada</a>");
    let tabtareas3 = $("<a class='nav-link' id='nav-finalizada-tab-"+user.IDUSER+"' data-bs-toggle='tab' data-bs-target='#nav-finalizada-"+user.IDUSER+"' type='button' role='tab' aria-controls='nav-finalizada-"+user.IDUSER+"' aria-selected='true'>Finalizada</a>");
    let tabtareas4 = $("<a class='nav-link' id='nav-pendiente-tab-"+user.IDUSER+"' data-bs-toggle='tab' data-bs-target='#nav-pendiente-"+user.IDUSER+"' type='button' role='tab' aria-controls='nav-pendiente-"+user.IDUSER+"' aria-selected='true'>Pendiente</a>");
    let tabcontenttareastab = $("<div class='tab-content w-100'></div>");
    let tabcontenttareastab1 = $("<div class='tab-pane fade show active' id='nav-activa-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-activa-tab-"+user.IDUSER+"'></div>");
    let tabcontenttareastab2 = $("<div class='tab-pane fade' id='nav-cancelada-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-cancelada-tab-"+user.IDUSER+"'></div>");
    let tabcontenttareastab3 = $("<div class='tab-pane fade' id='nav-finalizada-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-finalizada-tab-"+user.IDUSER+"'></div>");
    let tabcontenttareastab4 = $("<div class='tab-pane fade' id='nav-pendiente-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-pendiente-tab-"+user.IDUSER+"'></div>");
    
    //Agrega elementos a sección de tareas
    divcontenedorscciontareas2.append(h2tareas);
    divnavtabtareas.append(tabtareas1);
    divnavtabtareas.append(tabtareas2);
    divnavtabtareas.append(tabtareas3);
    divnavtabtareas.append(tabtareas4);
    tabcontenttareastab.append(tabcontenttareastab1);
    tabcontenttareastab.append(tabcontenttareastab2);
    tabcontenttareastab.append(tabcontenttareastab3);
    tabcontenttareastab.append(tabcontenttareastab4);
    divtabstareas.append(divnavtabtareas);
    divtabstareas.append(tabcontenttareastab);
    divcontenedorscciontareas.append(divcontenedorscciontareas2);
    divcontenedorscciontareas.append(divtabstareas);
    contenedortareas2.append(divcontenedorscciontareas);

    //Creación de sección de día
    let tabcontentdia = $("<div class='tab-pane fade' id='nav-dia-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-dia-tab'></div>");
    let divcontenedordia = $("<div class='text-center d-flex flex-column justify-content-center' style='width:400px; height:400px'></div>");
    let parrafocontador = $("<p id='MODALTIEMPOACTUALUSER"+user.IDUSER+"' style='font-size:20px'>00:00:00</p>");
    divcontenedordia.append(parrafocontador);
    tabcontentdia.append(divcontenedordia);

    //Creación de sección de semana
    let tabcontentsemana = $("<div class='tab-pane fade' id='nav-semana-"+user.IDUSER+"' role='tabpanel' aria-labelledby='nav-semana-tab'></div>");
    let divcontenedorsemana = $("<div class='mt-2' style='width:400px; height:380px'>");
    let canvas = $("<canvas name='chart' id='GRAFICAUSER"+user.IDUSER+"' width='400' height='380'></canvas>");
    divcontenedorsemana.append(canvas);
    tabcontentsemana.append(divcontenedorsemana);
    
    //Agregar todas las secciones
    tabcontents.append(tabcontenttareas);
    tabcontents.append(tabcontentdia);
    tabcontents.append(tabcontentsemana);
    modalbody.append(navtabsmodalbody);
    modalbody.append(tabcontents);
    modalcontent.append(modalheader);
    modalcontent.append(modalbody);
    modaldialog.append(modalcontent);
    modal.append(modaldialog);
    $("#modalesUsersServicio").append(modal);    
}

//PETICION SELECT * FROM app_tareas 
function select_tareas_user(id){
    $.ajax({
        url: base_url+"php/users/select_tareas_user.php",
        data: {IDUSER:id},
        type: "POST",
        success: function(res){
            if(res!=0){
                let tareas = JSON.parse(res);
                let activa = $("#nav-activa-"+id);
                let cancelada = $("#nav-cancelada-"+id);
                let finalizada = $("#nav-finalizada-"+id);
                let pendiente = $("#nav-pendiente-"+id);
                activa.html("");
                cancelada.html("");
                finalizada.html("");
                pendiente.html("");
                let modificar;
                let estado;
                tareas.forEach(tarea =>{
                    switch(tarea.IDESTADO){
                        case "1":
                            estado = "Activa";
                            modificar = activa;
                        break;
                        case "2":
                            estado = "Finalizada";
                            modificar = finalizada;
                        break;
                        case "3":
                            estado = "Cancelada";
                            modificar = cancelada;
                        break;
                        case "4":
                            estado = "Pendiente";
                            modificar = pendiente;
                        break;
                    }


                    //Creación de div con tarea 
                    let divtarea = $("<div id='TAREA"+tarea.IDTAREA+"' class='tarea border-bottom border-2 border-dark mt-2 rounded bg-light d-flex align-items-center justify-content-around' style='height:auto; width:95%;' data-toggle='modal' data-id='' data-target='#ModalTarea"+tarea.IDTAREA+"'></div>");
                    divtarea.bind('click',function(){
                        $("#ModalTarea"+tarea.IDTAREA).modal("show");
                    });
                    let pestado = $("<p class='d-inline pb-0 mb-0 col-3 estado"+tarea.IDESTADO+"' style='font-size:14px; font-weight:bold;'>"+estado+"</p>");
                    let fecha = $("<p class='d-inline pb-0 mb-0 col-4' style='font-size:15px;'>"+tarea.FECHA+"</p>");
                    let descripciontarea = $("<p class='d-inline pb-1 pt-1 mb-1 col-5 text-break' style='font-size:15px;'>"+urlify(tarea.TAREA)+"</p>");
                    divtarea.append(pestado);
                    divtarea.append(fecha);
                    divtarea.append(descripciontarea);
                    modificar.append(divtarea);
                    
                    //Creación de modal de la tarea 
                    let modal = $("<div id='ModalTarea"+tarea.IDTAREA+"' class='modal' tabindex='-1' data-backdrop='static'></div>");
                    let modaldialog = $("<div class='modal-dialog modal-dialog-centered'></div>");
                    let modalcontent = $("<div class='modal-content'></div>");

                    //Header Modal Tarea
                    let modalheader = $("<div class='modal-header'></div>");
                    let h5modaltitle = $("<h5 class='modal-title col-11 text-center'>Tarea: "+tarea.TAREA+"</h5>");
                    let close = $("<button type='button' class='btn-close' aria-label='Close'></button>");
                    close.bind('click',function(){
                        $("#ModalTarea"+tarea.IDTAREA).modal("hide");
                    })
                    modalheader.append([h5modaltitle,close]);

                    //Body Modal Tarea
                    let modalbody = $("<div class='modal-body d-flex flex-column'></div>");
                    let inputid = $("<input id='INPUTIDTAREA"+tarea.IDTAREA+"' value='"+tarea.IDTAREA+"' hidden/>");
                    let labeltarea = $("<label class='pr-2'>Tarea: </label>");
                    let textareatarea = $("<textarea id='TEXTAREATAREA"+tarea.IDTAREA+"'>"+tarea.TAREA+"</textarea>");
                    let salto = $("<br />");
                    let labelfechatarea = $("<label>Fecha: </label>");
                    let inpufecha = $("<input id='INPUTFECHATAREA"+tarea.IDTAREA+"' type='text' value='"+tarea.FECHA+"' hidden/>");
                    let divdatepicker = $("<div id='DATEPICKERTAREA"+tarea.IDTAREA+"' class='d-flex justify-content-center'></div>");
                    let labelcomentario = $("<label>Comentario: </label>");
                    let textareacomentario = $("<textarea id='TEXTAREACOMENTARIO"+tarea.IDTAREA+"'>"+ponerComentario(tarea.COMENTARIO)+"</textarea>");
                    let labelestado = $("<label class='pr-2'>Estado: </label>");
                    let inputestado = $("<input id='INPUTESTADOTAREA"+tarea.IDTAREA+"' type='text' value='"+tarea.IDESTADO+"' hidden/>");
                    let divbotonesestado = $("<div class='d-flex pt-3 justify-content-around'></div>");
                    let botonactiva = $("<button class='btn btn-success'>A</button>");
                    let botoncancelada = $("<button class='btn btn-danger'>C</button>");
                    let botonfinalizada = $("<button class='btn btn-primary'>F</button>");
                    let botonpendiente = $("<button class='btn btn-warning'>P</button>");
                    botonactiva.bind('click',function(){
                        $("#INPUTESTADOTAREA"+tarea.IDTAREA).val(1);
                    });
                    botonfinalizada.bind('click',function(){
                        $("#INPUTESTADOTAREA"+tarea.IDTAREA).val(2);
                    });
                    botoncancelada.bind('click',function(){
                        $("#INPUTESTADOTAREA"+tarea.IDTAREA).val(3);
                    });
                    botonpendiente.bind('click',function(){
                        $("#INPUTESTADOTAREA"+tarea.IDTAREA).val(4);
                    });
                    divbotonesestado.append([botonactiva,botonfinalizada,botoncancelada,botonpendiente])
                    modalbody.append([inputid,labeltarea,textareatarea,$("<br />"),labelfechatarea,inpufecha,divdatepicker,$("<br />"),labelcomentario,textareacomentario,$("<br />"),labelestado,inputestado,divbotonesestado]);


                    //Footer Modal Tarea
                    let footermodal = $("<div class='modal-footer'></div>");
                    let botonguardar = $("<button type='button' class='btn btn-primary'>Guardar</button>");
                    botonguardar.bind('click',function(){
                        modificar_tarea(tarea.IDTAREA,id);
                        $("#ModalTarea"+tarea.IDTAREA).modal("hide");
                    });
                    footermodal.append(botonguardar);

                    modalcontent.append([modalheader,modalbody,footermodal]);
                    modaldialog.append(modalcontent);
                    modal.append(modaldialog);
                    modificar.append(modal);
                });

                //Agregar datepicker a cada tarea
                tareas.forEach(tarea =>{
                    $("#DATEPICKERTAREA"+tarea.IDTAREA).datepicker({
						beforeShow: function() {
							setTimeout(function(){
								$('.ui-datepicker').css('z-index', 99999999999999);
							}, 0);
						},
						onSelect: function(date){
							let data = new Date(date);
							$("#INPUTFECHATAREA"+tarea.IDTAREA).val(ponerCero(data.getFullYear())+"-"+ponerCero(data.getMonth()+1)+"-"+ponerCero(data.getDate()));
						}
					}).show()
                })
            }
        }
    })
}

//CHECA SI UN TEXTO TIENE URL
function urlify(text) {
	let urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, function (url) {
	    return '<a href="' + url + '" target="_blank">' + url + "</a>";
	});
}

//SI UN COMENTATIO TIENE NULL NO PONE NADA
function ponerComentario(comentario){
	if(comentario!=null){
		return comentario;
	}else{
		return '';
	}
}

//SE EJECUTA AL DAR EL BOTÓN DE INICIAR
function accion_boton_iniciar(botonhtml){
    let id = botonhtml.id.replace("INICIARUSER","");
    let boton = $("#INICIARUSER"+id);
    let datetime = moment().format('YYYY-MM-DD HH:mm:ss');
    //Si no contadores activos entonces abre modal para poder iniciarlo
    if (timeouts[id] == 0) {
        $("#idUserNIP").val(id);
        $("#ModalNIP").modal('show');
	} else {
        //En caso de que si tenga pone lo necesario para que esté seguro
		$("#CANDADOUSER"+id).attr('hidden',true);
		$("#CONTINUARUSER"+id).attr('hidden',true);
		boton.removeClass("btn-danger");
		boton.addClass("btn-success");
		boton.val("Iniciar");
		clearTimeout(timeouts[id]);
		timeouts[id] = 0;
		$("#fechaFinContador").val(datetime);
        $("#tiempoContador").val($("#TIEMPOACTUALUSER"+id).text());
        $("#idUserContador").val(id);
		detener_contador();

		//Se ponen los valores en 0 después de detener el cronometro
		$("#TIEMPOACTUALUSER"+id).text("00:00:00");
        $("#MODALTIEMPOACTUALUSER"+id).text("00:00:00");
	}
}

//SE EJECUTA PARA QUE FUNCIONE EL CRONOMETRO
function cronometro_funcionando(id) {
    let diferenciahoras = moment().diff(cronometros[id],'h');
    let minutos = diferenciahoras*60;
    let difereciaminutos = moment().diff(cronometros[id],'m')-minutos;
    let segundos = diferenciahoras*3600 + difereciaminutos*60;
    let difereciasegundos = moment().diff(cronometros[id],'s')-segundos;
	let resultado = ponerCero(diferenciahoras)+":"+ponerCero(difereciaminutos)+":"+ponerCero(difereciasegundos);
	$("#TIEMPOACTUALUSER"+id).text(resultado);
    $("#MODALTIEMPOACTUALUSER"+id).text(resultado);
	timeouts[id] = setTimeout("cronometro_funcionando(" + id + ")", 1000);
}


//SE EJECUTA AL DAR CLICK AL BOTON CANDADO
function accion_boton_candado(botonhtml){
    let id = botonhtml.id.replace("CANDADOUSER","");
	$("#idUserNIP").val(id);
	if(!$("#INICIARUSER"+id).attr('hidden')){ 
		$("#CONTINUARUSER"+id).attr('hidden',true);
		$("#INICIARUSER"+id).attr('hidden',true);
	}else{
		$("#ModalNIP").modal('show');	        	
	}
}

//SE EJECUTA AL INGRESAR TODOS LOS NIP DEL MODAL NIP
function insertar_NIP(){
	let nip = $('#nip1').val()+$('#nip2').val()+$('#nip3').val()+$('#nip4').val();
	$('#nip1').val("");
	$('#nip2').val("");
	$('#nip3').val("");
	$('#nip4').val("");
	let id = $("#idUserNIP").val();
	validar_NIP(id,nip);
}

//VALIDA EL NIP QUE SE INGRESÓ EN EL MODAL NIP
function validar_NIP(id,nip){
	$.ajax({
		url: base_url+"php/validar_nip_user.php",
		type: "POST",
		data: {id:id},
		success: function (res) {
			let resnip = JSON.parse(res);
            console.log(resnip);
			if(nip === resnip[0].NIP){ 
				$("#ModalNIP").modal('hide');
                if($("#INICIARUSER"+id).attr('hidden')){
                    $("#INICIARUSER"+id).removeAttr('hidden');
                    $("#CONTINUARUSER"+id).removeAttr('hidden');
                }else{
                    let datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                    let date = moment().format('YYYY-MM-DD');
                    let boton = $("#INICIARUSER"+id);
                    boton.removeClass("btn-success");
		            boton.addClass("btn-danger");
		            $("#fechaInicioContador").val(datetime);
                    $("#fechaContador").val(date);
                    $("#idUserContador").val(id);
                    boton.val("Detener");
		            iniciar_contador();	
		            cronometros[id] = moment();
		            cronometro_funcionando(id);
		            $("#CANDADOUSER"+id).removeAttr('hidden');
		            boton.attr('hidden',true);
                }
			}
		},
	}); 
}

//SE EJECUTA AL HACER CLICK EN EL BOTÓN CONTINUAR
function accion_boton_continuar(botonhtml){
	let id = botonhtml.id.replace("CONTINUARUSER","");
	$("#CONTINUARUSER"+id).attr('hidden',true);
	$("#INICIARUSER"+id).attr('hidden',true);
}

//PONE CERO EN UNA FECHA O TIEMPO SI LO NECESITA
function ponerCero(tiempo) {
	return tiempo < 10 ? "0" + tiempo : +tiempo;
}


//INSERTA UN NUEVO CONTADOR EN LA BASE DE DATOS
function iniciar_contador(){
    let fechainicio = $("#fechaInicioContador").val();
    let fecha = $("#fechaContador").val();
    let estado = 1;
    let id = $("#idUserContador").val();
    $.ajax({
        url: base_url+"php/users/iniciar_contador.php",
        data: {FECHAINICIO:fechainicio, FECHA:fecha, ESTADO:estado, IDUSER:id},
        type: "POST",
        success: function(res){
            
        }
    });
}

//MODIFICA Y DETIENE UN CONTADOR QUE ESTÉ ACTIVO
function detener_contador(){
    let fechafin = $("#fechaFinContador").val();
    let tiempo = $("#tiempoContador").val();
    let estado = 0;
    let id = $("#idUserContador").val();
    $.ajax({
        url: base_url+"php/users/detener_contador.php",
        data: {FECHAFIN:fechafin, TIEMPO:tiempo, ESTADO:estado, IDUSER:id},
        type: "POST",
        success: function(res){
            
        }
    });
}

//OBTIENE LOS CONTADORES ACTIVOS
function select_contadores_iniciados(){
    $.ajax({
        url: base_url+"php/users/select_contadores_users.php",
        success: function(res){
            if(res!="0"){
                let contadores = JSON.parse(res);
                contadores.forEach(contador => {
                    let id = contador.IDUSER;
                    let fecha = moment(contador.FECHAINICIO);
                    $("#INICIARUSER"+id).val("Detener");
					$("#INICIARUSER"+id).removeClass("btn-success");
					$("#INICIARUSER"+id).addClass("btn-danger");
					$("#INICIARUSER"+id).attr('hidden',true);
					$("#CANDADOUSER"+id).removeAttr('hidden');
					cronometros[id] = fecha;
					cronometro_funcionando(id);
                });
            }
        }
    })
}

//INSERTA NUEVA TAREA
function insertar_nueva_tarea(iduser){
    let id = $("#INPUTIDUSER"+iduser).val();
    let tarea = $("#TAREA"+iduser).val();
    let fecha = $("#FECHA"+iduser).val();
    let idestado = $("#ESTADO"+iduser).val();
    $.ajax({
        url: base_url+"php/users/insert_tarea_user.php",
        data: {IDUSER:id, TAREA:tarea, FECHA:fecha, IDESTADO:idestado},
        type: "POST",
        success: function(res){
            $("#TAREA"+iduser).val("");
            select_tareas_user(iduser);
        }
    })
}

//MODIFICA UNA TAREA EXISTENTE
function modificar_tarea(id, iduser){
    let idtarea = $("#INPUTIDTAREA"+id).val();
    let tarea = $("#TEXTAREATAREA"+id).val();
    let fecha = $("#INPUTFECHATAREA"+id).val();
    let comentario = $("#TEXTAREACOMENTARIO"+id).val();
    let idestado = $("#INPUTESTADOTAREA"+id).val();
    $.ajax({
        url: base_url+"php/users/modificar_tarea_user.php",
        data: {IDTAREA:idtarea, TAREA:tarea, FECHA:fecha, COMENTARIO:comentario, IDESTADO:idestado},
        type: "POST",
        success: function(res){
            select_tareas_user(iduser);
        }
    })
}