// var svg1 = d3.select("svg"),
//     margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = +svg1.attr("width") - margin.left - margin.right,
//     height = +svg1.attr("height") - margin.top - margin.bottom;
//
// var parseTime = d3.timeParse("%Y")
// bisectDate = d3.bisector(function(d) { return d.year; }).left;
//
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);
//
// var line = d3.line()
//     .x(function(d) { return x(d.year); })
//     .y(function(d) { return y(d.value); });
//
// var g = svg1.append("gr")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// d3.csv("Data/data.csv", function(error, data) {
//     if (error) throw error;
//
//     data.forEach(function(d) {
//         d.year = parseTime(d.year);
//         d.value = +d.value;
//     });
//
//     x.domain(d3.extent(data, function(d) { return d.year; }));
//     y.domain(d3.extent(data, function(d) { return d.value;}));
//
//     g.append("gr")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
//
//
//     g.append("gr")
//         .attr("class", "axis axis--y")
//         .attr("fill", "#5D6971")
//         .text("Rating")
//         .call(d3.axisLeft(y).ticks(5));
//
//
// //        g.append("g")
// //            .attr("class", "axis axis--y")
// //            .call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return parseInt(d); }))
// //            .append("text")
// //            .attr("class", "axis-title")
// //            .attr("transform", "rotate(-90)")
// //            .attr("y", 5)
// //            .attr("dy", ".71em")
// //            .style("text-anchor", "end")
// //            .attr("fill", "#5D6971")
// //            .text("Population)");
//
//     g.append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", line);
//
//     var focus = g.append("gr")
//         .attr("class", "focus")
//         .style("display", "none");
//
//     focus.append("line")
//         .attr("class", "x-hover-line hover-line")
//         .attr("y1", 0)
//         .attr("y2", height);
//
//     focus.append("line")
//         .attr("class", "y-hover-line hover-line")
//         .attr("x1", width)
//         .attr("x2", width);
//
//     focus.append("circle")
//         .attr("r", 7.5);
//
//     focus.append("text")
//         .attr("x", 15)
//         .attr("dy", ".31em");
//
//     svg1.append("rect")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//         .attr("class", "overlay")
//         .attr("width", width)
//         .attr("height", height)
//         .on("mouseover", function() { focus.style("display", null); })
//         .on("mouseout", function() { focus.style("display", "none"); })
//         .on("mousemove", mousemove);
//
//     function mousemove() {
//         var x0 = x.invert(d3.mouse(this)[0]),
//             i = bisectDate(data, x0, 1),
//             d0 = data[i - 1],
//             d1 = data[i],
//             d = x0 - d0.year > d1.year - x0 ? d1 : d0;
//         focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
//         focus.select("text").text(function() { return d.value; });
//         focus.select(".x-hover-line").attr("y2", height - y(d.value));
//         focus.select(".y-hover-line").attr("x2", width + width);
//     }
// });

Plotly.d3.csv("Data/rating_66D9bO-p8FG01OfmfX14LA.csv", function(err, rows) {

    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    var trace1 = {
        type: "scatter",
        mode: 'lines+markers',

        marker: {
            color: 'rgb(128, 0, 128)',
            size: 8
        },

        line: {
            color: 'rgb(55, 128, 191)',
            width: 3,
            shape: 'spline'
        },
        name: 'stars',
        x: unpack(rows, 'date'),
        y: unpack(rows, 'stars'),
        // x: ["2006","2007"],
        // y: graph_json.rating
        line: {color: '#17BECF'}
    };
    console.log("Ready function rating_graph");
    console.log(trace1);

    //
    // var trace2 = {
    //     type: "scatter",
    //     mode: 'lines+markers',
    //     marker: {
    //         color: 'rgb(128, 0, 128)',
    //         size: 8
    //     },
    //     line: {
    //         color: 'rgb(55, 128, 191)',
    //         width: 3
    //     },
    //     name: 'McDonald',
    //     x: unpack(rows, 'Year'),
    //     y: unpack(rows, 'McDonald')
    // }
    //
    // var data = [trace1,trace2];
    var data = [trace1];
    var layout = {
        title: 'Ratings', color: '#2A363B',
        "titlefont": {
            family: 'Arial',
            size: 26,
            color: '#2A363B'
        },



        xaxis: {
            range: ['2006', '2017'],
            // type: 'linear',
            title: 'Year',
            showgrid: false,
            showline: true,
            color: '#6F257F'

        },
        yaxis: {
            range: [0, 5],
            type: 'linear',
            title: 'Rating',
            showgrid: false,
            showline: true,
            color: '#6F257F'

        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'

    };
    Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});

});