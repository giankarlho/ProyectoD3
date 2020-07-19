function graficar() {
    colores = {
        'PA': '#8888FF',
        'AS': '#22cc22'
    }
    datos = []
    load()
}
function render(data) {

    hbars = d3.select('#grafica')
        .selectAll('div.hbar')
        .data(data)

    hbars.enter()
        .append('div')
        .attr('class', 'hbar')
        .merge(hbars)
        .style('width', function (d) {
            return d.IE * 5 + 'px'
        })
        .style('background-color', function (d) {
            return colores[d.Carrera]
        })

        .text(function (d) {
            return d.IE + ' con ' + d.edad + ' años'
        })
    d3.selectAll('div.hbar')
        .data(data)
        .exit()
        .remove()
}

function load() {
    d3.csv('/datos/alumnos.csv')
        .then(function (data) {
            datos = data
            render(data)
        })
}

function select(carrera) {
    d = datos.filter(function (d, i) {
        if (carrera == 'Todos') {
            return true
        }
        return carrera == d.Carrera
    })
    render(d)
}

