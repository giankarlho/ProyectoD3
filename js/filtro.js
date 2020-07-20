tipo = 'IE'
function graficar() {
    colores = {
        'PA': '#8888FF',
        'AS': '#22cc22'
    }
    // por defecto es el 1er gráfico de inteligencia emocional por alumno
    datos = []
    load(tipo)
}
function render1(data) {

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

function render2(data) {

    hbars = d3.select('#grafica')
        .selectAll('div.hbar')
        .data(data)

    hbars.enter()
        .append('div')
        .attr('class', 'hbar')
        .merge(hbars)
        .style('width', function (d) {
            return d.FD * 10 + 'px'
        })
        .style('background-color', function (d) {
            return colores[d.Carrera]
        })

        .text(function (d) {
            return d.FD + ' con ' + d.edad + ' años'
        })
    d3.selectAll('div.hbar')
        .data(data)
        .exit()
        .remove()
}

function render3(data) {

    margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    svg = d3.select('#grafica')
            .selectAll('div.hbar')
            .data(data)

    svg.enter()
       .append("div")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis: scale and draw:
    x = d3.scaleLinear()
        .domain([0, 30])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function (d) { return d.edad; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(70)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
                .range([height, 0]);

    y.domain([0, d3.max(bins, function (d) { return d.length; })]);  

    svg.append("g")
        .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg.selectAll('div.hbar')
        .data(bins)
        .attr('class', 'hbar')
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function (d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

    d3.selectAll('div.hbar')
        .data(data)
        .exit()
        .remove()
}
/*
var mapa = data.map(function (i) { return parseInt(i.edad) })
 
var histograma = d3.histogram()
                    .value(function (d) { return d.edad })
                    .domain(x.domain())
                    .thresholds(x.ticks(10))

bins = histogram(data)                        

var canvas = d3.select('#grafica')
    .append("svg")
    .attr('width', 500)
    .attr('height', 500)

var bars = canvas.selectAll(".bar")
    .data(histograma)
    .enter()
    .append('g')

bars.append("rect")
    .attr('x',function (d) { return d.Edad*5; })
    .attr('y',0) 
    .attr('width',function (d) { return d.Edad*5-5; })
    .attr('height',function (d) { return d.Edad*20; })            
    .attr('fill','steelblue')

    console.log('ydale UUUUUUUUU')
*/




function load(tipo) {
    //alert(tipo)
    d3.csv('/datos/alumnos.csv')
        .then(function (data) {
            datos = data
            tipoTab(tipo, data)
        })
}

function select(carrera) {
    d = datos.filter(function (d, i) {
        if (carrera == 'Todos') {
            return true
        }
        return carrera == d.Carrera
    })
    tipoTab(tipo, d)
}

function tipoTab(tipo, data) {
    switch (tipo) {
        case 'IE': render1(data); break;
        case 'DF': render2(data); break;
        case 'Edades': render3(data); break;
    }
}




