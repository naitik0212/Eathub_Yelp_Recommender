
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
        title: 'Ratings of Restaurant', color: '#2A363B',
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
    Plotly.newPlot('myDiv2', data, layout, {displayModeBar: false});

});