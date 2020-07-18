var datos1 = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

var datos2 = []

var scale1 = d3.scaleLinear()
    .domain([d3.min(datos1), d3.max(datos1)])
    .range([50, 500]);

function load() {
    d3.csv('/datos/alumnos.csv')
        .then(function (data) {
            console.log(data)
            graficar2(data)
        })
}

function graficar2(data) {
    load()
    d3.select("#grafica")
        .selectAll("div")
        .data(data)
        .enter().append("div")
        .style("width", function (d) {
            return scale(d) + 'px'
        })
        .text(function (d) {
            return d;
        })
}

function render(data) {
    hbars = d3.select('#grafica')
        .selectAll('div.hbar')
        .data(data)

    hbars.enter()
        .append('div')
        .attr('class', 'hbar')
        .style('width', function (d) {
            return d.IE * 10 + 'px'
        })
        .style('background-color', function (d) {
            return colores[d.carrera]
        })
        .text(function (d) {
            return d.region + ' quiero ver esto'
        })
}

function graficar1() {
    d3.select(".barras")
        .selectAll("div")
        .data(datos1)
        .enter().append("div")
        .style("width", function (d) {
            return scale1(d) + 'px'
        })
        .text(function (d) {
            return d;
        })
}

function holaMundo() {
    d3.select('body')
        .append('h1')
        .text('Hola mundo')
}
