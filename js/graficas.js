var ctx = {};

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
						data: [0,0,0,0,0,0,0],
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
						max: 50,
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

function obtenerSemanaActual(){
	let iniciosemana = moment().startOf('week').format('YYYY-MM-DD');
	let finsemana   = moment().endOf('week').format('YYYY-MM-DD');
	console.log(iniciosemana, finsemana);
}

obtenerSemanaActual();