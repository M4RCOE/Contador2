var ctx = {};
var horas = [];
base_url = $("#baseURL").val();

function inicializar_graficas(){
	for (chart of $('[name="chart"]')) {
		ctx[chart.id] = $("#"+chart.id)[0].getContext("2d");
		charts[chart.id] = new Chart(ctx[chart.id], {
			type: "line",
			data: {
				labels: ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
				datasets: [
					{
						label: "Horas trabajadas",
						data: horas,
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(255, 206, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(153, 102, 255, 0.2)",
						],
						borderColor: [
							"rgba(255, 99, 132, 1)",
							"rgba(54, 162, 235, 1)",
							"rgba(255, 206, 86, 1)",
							"rgba(75, 192, 192, 1)",
							"rgba(153, 102, 255, 1)",
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				plugins: {
					legend: {
						labels: {
							font: {
								size: 26,
								weight: 'bold'
							},
							color: '#3c90e4'
						}
					}
				},
				scales: {
					y: {
						min: 0,
						max: horas.reduce((acumulador,valoractual)=>{acumulador, valoractual}),
						grid: {
							display: false,
						},
						ticks:{
							color: 'black'
						},
						
					},
					x: {
						grid: {
							display: false,
						},
						ticks:{
							color: 'black'
						},
					},
				},
			},
		});
	}	
}

function obtenerSemanaActual(id){
	let iniciosemana = moment().startOf('week').format('YYYY-MM-DD');
	let segundo = moment().startOf('week').add(1,'d').format('YYYY-MM-DD');
	let tercero = moment().startOf('week').add(2,'d').format('YYYY-MM-DD');
	let cuarto = moment().startOf('week').add(3,'d').format('YYYY-MM-DD');
	let quinto = moment().startOf('week').add(4,'d').format('YYYY-MM-DD');
	let sexto = moment().startOf('week').add(5,'d').format('YYYY-MM-DD');
	let finsemana = moment().endOf('week').format('YYYY-MM-DD');
	$.ajax({
        url: base_url+"php/graficas/select_contadores_semana_user.php",
        data: {id:id,inicio:iniciosemana,fin:finsemana},
        type: "POST",
        success: function(res){
            if(res!="0"){
                let contadores = JSON.parse(res);
				let dicc = {[iniciosemana]:0,[segundo]:0,[tercero]:0,[cuarto]:0,[quinto]:0,[sexto]:0,[finsemana]:0};
				console.log(dicc);
				let fecha = null, fechainicio, fechafin;
				let fecha_anterior;
				contadores.forEach(contador => {
					if(fecha!=contador.FECHA){
						fecha = contador.FECHA;
						dicc[moment(fecha).format('YYYY-MM-DD')] = 0;
						if(fecha_anterior!=null){
							dicc[moment(fecha).format('YYYY-MM-DD')] = dicc[moment(fecha_anterior).format('YYYY-MM-DD')];
						}
					}
					fechainicio = contador.FECHAINICIO;
					fechafin = contador.FECHAFIN;
					if(fechafin===null){
						fechafin = moment();
						fecha = moment(fechainicio);
						while(fecha<=fechafin){
							if(!(moment(fecha).format('YYYY-MM-DD') in dicc)){
								dicc[moment(fecha).format('YYYY-MM-DD')] = 0;
							}
							let fecha2 = moment(contador.FECHA+"  23:59:59");
							let diferenciahoras2 = moment(fecha2).diff(fechainicio,'h');
    						let minutos2 = diferenciahoras2*60;
    						let difereciaminutos2 = moment(fecha2).diff(fechainicio,'m')-minutos2;
    						let segundos2 = diferenciahoras2*3600 + difereciaminutos2*60;
    						let difereciasegundos2 = moment(fecha2).diff(fechainicio,'s')-segundos2;
							let diferencia_dia_inicial = diferenciahoras2+(difereciaminutos2/60)+(difereciasegundos2/3600);
							dicc[moment(fecha).format('YYYY-MM-DD')] = diferencia_dia_inicial;
							let diferenciahoras = moment(fecha).diff(fechainicio,'h');
    						let minutos = diferenciahoras*60;
    						let difereciaminutos = moment(fecha).diff(fechainicio,'m')-minutos;
    						let segundos = diferenciahoras*3600 + difereciaminutos*60;
    						let difereciasegundos = moment(fecha).diff(fechainicio,'s')-segundos;
							let diferencia_en_horas = diferenciahoras+(difereciaminutos/60)+(difereciasegundos/3600);
							dicc[fecha.format('YYYY-MM-DD')] += diferencia_en_horas;
							fecha.add(1,'d');
						}
						fecha = moment(moment().add(1,'d').format('YYYY-MM-DD'));
						fechainicio = moment();
						let diferenciahoras = moment(fecha).diff(fechainicio,'h');
    					let minutos = diferenciahoras*60;
    					let difereciaminutos = moment(fecha).diff(fechainicio,'m')-minutos;
    					let segundos = diferenciahoras*3600 + difereciaminutos*60;
    					let difereciasegundos = moment(fecha).diff(fechainicio,'s')-segundos;
						let diferencia_en_horas = diferenciahoras+(difereciaminutos/60)+(difereciasegundos/3600);
						dicc[fechainicio.format('YYYY-MM-DD')] -= diferencia_en_horas;
					}else{
						let diferenciahoras = moment(fechafin).diff(fechainicio,'h');
    					let minutos = diferenciahoras*60;
    					let difereciaminutos = moment(fechafin).diff(fechainicio,'m')-minutos;
    					let segundos = diferenciahoras*3600 + difereciaminutos*60;
    					let difereciasegundos = moment(fechafin).diff(fechainicio,'s')-segundos;
						let diferencia_en_horas = diferenciahoras+(difereciaminutos/60)+(difereciasegundos/3600);
						dicc[moment(fecha).format('YYYY-MM-DD')] += diferencia_en_horas;
					}
					fecha_anterior = fecha;
				});
				horas.push(dicc[iniciosemana]);
				horas.push(dicc[segundo]);
				horas.push(dicc[tercero]);
				horas.push(dicc[cuarto]);
				horas.push(dicc[quinto]);
				horas.push(dicc[sexto]);
				horas.push(dicc[finsemana]);
            }
			
        }
    })
}

obtenerSemanaActual(1);