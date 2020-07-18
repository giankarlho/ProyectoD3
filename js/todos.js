function graficar() {

    function render(data) {

        hbars = d3.select('#grafica')
            .selectAll('div.hbar')
            .data(data)

        hbars.enter()
            .append('div')
            .attr('class', 'hbar')
            .style('width', function (d) {
                return d.IE*5 + 'px'
            })

            .text(function (d) {
                return d.IE + ' que pasa ' 
            })
    }

    function load() {
        d3.csv('/datos/alumnos.csv')
            .then(function (data) {
                console.log(data[0])             
                render(data)
            })
    }
    load()
}