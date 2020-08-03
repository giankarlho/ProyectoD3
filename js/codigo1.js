
tipo = 'IE'             // IE , FD
como = 'Ordenar por'    // 
comparador=''       
carrera = 'Todos'   // PA, AS, Todos


comparaxedadIEMaMe = function (a, b) {
    return a.edad < b.edad ? 1 : -1
}

comparaxedadIEMeMa = function (a, b) {
    return a.edad > b.edad ? 1 : -1
}

comparaxieMaMe = function (a, b) {
    return a.IE < b.IE ? 1 : -1
}

comparaxieMeMa = function (a, b) {
    return a.IE > b.IE ? 1 : -1
}

comparaxedadDFMaMe = function (a, b) {
    return a.edad < b.edad ? 1 : -1
}

comparaxedadDFMeMa = function (a, b) {
    return a.edad > b.edad ? 1 : -1
}

comparaxdfMaMe = function (a, b) {
    return a.FD < b.FD ? 1 : -1
}

comparaxdfMeMa = function (a, b) {
    return a.FD > b.FD ? 1 : -1
}

function graficar() {
    colores = {
        'AS': '#8888FF',
        'PA': '#00FF00'
    }
    // por defecto es el 1er gráfico de inteligencia emocional por alumno
    datos = []
    load(tipo)
}

function render1(data, comparador = null) {

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

    if (comparador)
        hbars.sort(comparador)

    d3.selectAll('div.hbar')
        .data(data)
        .exit()
        .remove()
}

function render2(data, comparador = null) {

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

    if (comparador)
        hbars.sort(comparador)

    d3.selectAll('div.hbar')
        .data(data)
        .exit()
        .remove()
}

function load(tipo) {
    //alert(tipo)
    d3.csv('/datos/alumnos.csv')
        .then(function (data) {
            datos = data
            tipoTab(tipo, data)
        })
}

function select(TipCarrera) {    
    d = datos.filter(function (d, i) {
        carrera = TipCarrera
        if (TipCarrera == 'Todos') {
            return true
        }        
        return TipCarrera == d.Carrera        
    })
    tipoTab(tipo, d)
}

function tipoTab(variable, data) {
    switch (variable) {
        case 'IE': tipo = 'IE'; render1(data,comparador); break;
        case 'DF': tipo = 'DF'; render2(data,comparador); break;
    }
}

function ordenar(como) {
    switch (como) {
        case 'edadIEMaMe': comparador = comparaxedadIEMaMe; break;
        case 'edadIEMeMa': comparador = comparaxedadIEMeMa; break;
        case 'ieMaMe': comparador = comparaxieMaMe; break;
        case 'ieMeMa': comparador = comparaxieMeMa; break;
        case 'edadDFMaMe': comparador = comparaxedadDFMaMe; break;
        case 'edadDFMeMa': comparador = comparaxedadDFMeMa; break;
        case 'dfMaMe': comparador = comparaxdfMaMe; break;
        case 'dfMeMa': comparador = comparaxdfMeMa; break;
        default: comparador = ''; break;
    }
    select(carrera);
    //(tipo == 'IE') ? render1(datos, comparador) : render2(datos, comparador);
    
}


/*
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
*/