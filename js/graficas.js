var ctx = {};
function inicializar_graficas(){
	for (chart of $('[name="chart"]')) {
		ctx[chart.id] = $("#"+chart.id)[0].getContext("2d");
		charts[chart.id] = new Chart(ctx[chart.id], {
			type: "bar",
			data: {
				labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
				datasets: [
					{
						label: "Horas trabajadas",
						data: [0,0,0,0,0],
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
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	}	
}
