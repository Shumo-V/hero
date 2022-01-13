$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault()
        let valueInput = $("#hero").val();

        $.ajax({
            url: 'https://superheroapi.com/api.php/4422922557813929/' + valueInput,
            success: function(data) {
                let imagen = data.image.url;
                let nombre = data.name;
                let full_name = data.biography['full-name'];
                let conexiones = data.connections['group-affiliation'];
                let publicado_por = data.biography.publisher;
                let ocupación = data.work.occupation;
                let primera_aparición = data.biography['first-appearance'];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases;

                $("#info").html(
                    `<div class="card m-1 m-md-4 mt-4">
                    <div class="position-relative">
                        <div class="cabeza position-absolute top-0 start-0 translate-middle">
                            <h2>${nombre}</h2>
                        </div>
                    </div>

                    <div class="buscar2 row m-auto">
                        <div class="col-12 col-sm-5 p-0">
                            <img src="${imagen}" class="card-img-top h-100" alt="...">
                        </div>

                        <div class="col-12 col-sm-7 p-0">
                            <div class="row p-1">
                                <div class="col-12">
                                    <h4><u>Nombre verdadero:</u> ${full_name}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Conexiones:</u> ${conexiones}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Publicado por:</u> ${publicado_por}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Ocupación:</u> ${ocupación}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Primera aparición:</u> ${primera_aparición}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Altura:</u> ${altura['0']} - ${altura['1']}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Peso:</u> ${peso['0']} - ${peso['1']}.</h4>
                                </div>
                                <div class="col-12">
                                    <h4><u>Alianzas:</u> ${alianzas}.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);

                let estadisticas = []

                let arr_powerstats = Object.entries(data.powerstats);

                arr_powerstats.forEach(function(stat) {
                    estadisticas.push({
                        label: stat[0].charAt(0).toUpperCase() + stat[0].slice(1),
                        y: parseInt(stat[1])
                    })
                })
                let config = {
                    exportFileName: "Doughnut Chart",
                    exportEnabled: true,
                    animationEnabled: true,

                    title: {
                        text: `Estadísticas de ${nombre}`
                    },
                    data: [{
                        type: "doughnut",
                        innerRadius: 90,
                        showInLegend: true,
                        legendText: '{label}',
                        toolTipContent: `{label} : {y}`,
                        indexLabel: `{y}`,
                        dataPoints: estadisticas,
                    }]
                }

                let chart = new CanvasJS.Chart('chartContainer', config);
                chart.render();
                $('#hero').val('')
            }
        });
    });
})

let buscar = $('#busqueda');
buscar.click(function() {
    let id = $('#hero').val();
    let permitido = /[a-zA-Z]/gim;

    if (id.match(permitido)) {
        alert(`Lo sentimos! Solo puedes ingresar números`);
    } else if (id == "" || id == 0) {
        alert(`Lo sentimos! Debes ingresar al menos un número y mayor que cero!`);
    } else if (id > 731) {
        alert(`Lo sentimos! Nuestra base de datos cuenta con solo 731 personajes :(`);
    };
})

$(document).ready(function() {
    $('input').tooltip();
});