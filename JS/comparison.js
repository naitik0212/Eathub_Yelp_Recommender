
function showDiv() {
    document.getElementById('tips').style.display = "block"
    document.getElementById('a').classList.add('hide');

}

var formatAsPercentage = d3.format("%");

function dsPieChart() {

    // list = [mexican,chinese,japanese,indian,American];
    
               var dataset = [
                {category: "Positive", value: 0.6},
                {category: "Negative", value: 0.13},
                {category: "Neutral", value: 0.27},
            ];

        



    var width = 400;
    var height = 400;
    var biggerRadius = Math.min(width, height) / 2;
    var smallRadius = biggerRadius * .99;
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color = d3.scaleOrdinal() // D3 Version 4
        .domain(["Positive", "Negative", "Neutral"])
        .range(["#009933", "#FF0000" , "#697EAD"]);


    var arc = d3.arc()
        .outerRadius(biggerRadius)
        .innerRadius(smallRadius);


    var pieChartViz = d3.select("#pieChartsvg")
        .append("svg:svg")
        .data([dataset])
        .attr("height", height)
        .attr("width", width)
        .append("svg:g")
        .attr("align", "center")
        .attr("transform", "translate(" + biggerRadius + "," + biggerRadius + ")")
    ;

    var arcFinal = d3.arc().innerRadius(biggerRadius * .35).outerRadius(biggerRadius);


    var pie = d3.pie()
        .value(function (da) {
            return da.value;
        });

    var arcs = pieChartViz.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice")
        .on("mouseover", function hover() {
            d3.select(this).select("path").transition()
                .attr("d", d3.arc().innerRadius(biggerRadius * .20).outerRadius(biggerRadius))
                .style("cursor", "pointer")
                // .style('fill', '#FFFACD')
                .duration(1000)

            ;
        })
        .on("mouseout", function emptyspace() {
            d3.select(this).select("path").transition()
                .duration(500)
                .style("cursor", "default")
                // .style('fill', function (da, i) {
                //     return color(i);
                // })
                .attr("d", d3.arc().innerRadius(biggerRadius * .35).outerRadius(biggerRadius))
            ;
        })
        .on("click", up)
    ;

    arcs.append("svg:path")
        .attr("d", arc)
        .attr("fill", function (da, i) {
            return color(i);
        })
        .append("svg:title")
        .text(function (da) {
            return da.data.category + ": " + formatAsPercentage(da.data.value);
        });

    d3.selectAll("g.slice").selectAll("path").transition()
        .delay(50)
        .duration(800)
        .attr("d", arcFinal)
    ;

    arcs.filter(function (da) {
        return da.endAngle - da.startAngle > .2;
    })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", function (da) {
            return "translate(" + arcFinal.centroid(da) + ")rotate(" + angle(da) + ")";
        })
        .on("mouseover", function(da) {
            d3.select(this).style("cursor", "pointer").style("fill", "white");
        })
        .on("mouseout", function(da) {
            d3.select(this).style("cursor", "default").style("fill", "black");
        })
        //.text(function(d) { return formatAsPercentage(da.value); })
        .text(function (da) {
            return da.data.category;
        })
    ;

    function angle(da) {
        var a = (da.startAngle + da.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    }

    pieChartViz.append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text("Reviews")
        .attr("class", "title")
    ;

    function up(da, i) {
        console.log(da.data.category);
        updateBarChart(da.data.category, color(i));
    }
}

dsPieChart();

function updateBarChart(group, colorChosen) {
    var group1 = group;
    var color = colorChosen;

    console.log("Over Here");
    var datasetBarChart;
    d3.json("Data/abc.json",function (data) {
       //console.log(data);
        datasetBarChart = data;
        myFunc(datasetBarChart,group1,colorChosen);

    });

}

function myFunc(data, group,colorChosen) {
    //console.log(data);
    var datasetBarChart = data;
    console.log(datasetBarChart);
    var barChart = d3.select("#barChart");
    barChart.selectAll("*").remove();
    // d3.select("svg").selectAll("*").remove();



    var svg = d3.select("#barChart"),
        margin = {top: 50, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range([colorChosen, "#EEDD15"]);


    d3.csv("Data/data1.csv", function (data, i, columns) {
        },
        function (error, data) {
            //if (error) throw error;
            var name = group;
            data = datasetBarChart[group];

            // for(var i = 0; i < 5; i++){
            //     temp = {};
            //     temp['Year'] = 2009 + i;
            //     temp['Winner'] = datasetBarChart['Aces'].Winner;
            //     temp['Loser'] = datasetBarChart['Aces'].Loser;
            //
            //     data.push(temp);
            // }

            // var nest = d3.nest()
            //     .key(function(d) { return d.Year; })
            //     .key(function(d) { return d.Winner; })
            //     .key(function(d) { return d.Winner; })
            //     .entries(datasetBarChart);

            data.push(['Year', 'Positive_Reviews', 'Negative_Reviews']);
            console.log(data);
            var keys = data[data.length - 1].slice(1);


            // var keys = data.columns.slice(1);

            x0.domain(data.map(function (d) {
                return d.Year;
            }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function (d) {
                return d3.max(keys, function (key) {
                    return d[key];
                });
            })]).nice();


            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.Year) + ",0)";
                })
                .selectAll("rect")
                .data(function (d) {
                    return keys.map(function (key) {
                        return {key: key, value: d[key]};
                    });
                })
                .enter().append("rect")

                .attr("x", function (d) {
                    return x1(d.key);
                })
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height - y(d.value);
                })
                .attr("fill", function (d) {
                    return z(d.key);
                })
                .append('title') // Tooltip
                .text(function (d) {
                    return 'No of games won by ' + d.key + ' is ' + d.value + ' for ' + group
                });


            g.append("g")
                .attr("class", "axis")
                .text("No. of Games")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("No. of Games");

            var legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 15)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function (d) {
                    return d;
                });
            console.log(name);
            svg.append("text")
                .attr("x", (width + margin.left + margin.right) / 2)
                .attr("y", 42)
                .attr('font-weight', 'bold')
                .attr("class", "title")
                .attr("text-anchor", "middle")
                .text("Comparison of " + name + " reviews and negative reviews over the years")
            ;

        });
}

