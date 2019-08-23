var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [10, 15, 13, 17, 18, 17, 14],
    name: '2018',
    mode: 'lines+markers'
};

var trace2 = {
    x: [2, 3, 4, 5, 6, 7],
    y: [9, 5, 11, 9, 10, 12],
    name: '2019',
    mode: 'lines+markers'
};

var data = [trace1, trace2];

var layout = {
    title: 'Comparativa de AQI', 
    font: {
        // family: 'Courier New, monospace',
        size: 16
    },
    xaxis: {
        title: 'Meses'
    },
    yaxis: {
        title: 'AQI'
    }
};

Plotly.newPlot('graph', data, layout);