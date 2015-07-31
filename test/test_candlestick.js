'use strict';

var tap = require('tap');

var candlestick = require('../src/candlestick');

tap.test('should output candlestick fig object - 1', function(t) {
    t.plan(1);

    var fig = candlestick.create(
        { open: [33.0], high: [33.2], low: [32.7], close: [33.1] }
    );

    var expected = {
        data: [
            {
                type: 'bar',
                x: [0],
                y: [33.0],
                legendgroup: 'Increasing',
                marker: { color: 'rgba(0,0,0,0)' },
                showlegend: false,
                hoverinfo: 'none'
            },
            {
                type: 'bar',
                x: [0],
                y: [0.10000000000000142],
                marker: { color: '#3D9970' },
                showlegend: false,
                hoverinfo: 'none',
                legendgroup: 'Increasing'
            },
            {
                type: 'scatter',
                mode: 'lines',
                x: [0, 0, 0, 0, null],
                y: [32.7, 33.0, 33.1, 33.2, null],
                text: ['Low', 'Open', 'Close', 'High', ''],
                name: 'Increasing',
                legendgroup: 'Increasing',
                line: { color: '#3D9970' },
                showlegend: false
            },
            {
                type: 'bar',
                x: [],
                y: [],
                legendgroup: 'Decreasing',
                marker: { color: 'rgba(0,0,0,0)' },
                showlegend: false,
                hoverinfo: 'none'
            },
            {
                type: 'bar',
                x: [],
                y: [],
                legendgroup: 'Decreasing',
                marker: { color: '#FF4136' },
                showlegend: false,
                hoverinfo: 'none'
            },
            {
                type: 'scatter',
                mode: 'lines',
                x: [],
                y: [],
                text: [],
                name: 'Decreasing',
                legendgroup: 'Decreasing',
                line: { color: '#FF4136' },
                showlegend: false
            }
        ],
        layout: {
            barmode: 'stack',
            bargroupgap: 0.2,
            yaxis: { 
                fixedrange: true,
                range: [32.65, 33.25]
            }
        }
    };

    t.same(fig.data, expected.data);
});

tap.test('should output candlestick fig object - 2', function(t) {
    t.plan(1);

    function toDate(d) {
        return d!== null ?
            new Date(d[0], d[1]-1, d[2], d[3], d[4]).getTime() :
            null;
    }

    var fig = candlestick.create(
        {
            open: [33.01, 33.31, 33.50, 32.06, 34.12, 33.05, 33.31, 33.50],
            high: [34.20, 34.37, 33.62, 34.25, 35.18, 33.25, 35.37, 34.62],
            low: [31.70, 30.75, 32.87, 31.62, 30.81, 32.75, 32.75, 32.87],
            close: [34.10, 31.93, 33.37, 33.18, 31.18, 33.10, 32.93, 33.70],
            dates: [
                [2013,3,4] ,[2013,6,5], [2013,9,6], [2013,12,4],
                [2014,3,5], [2014,6,6] ,[2014,9,4], [2014,12,5]
            ].map(function(d) { return new Date(d[0], d[1]-1, d[2]); })
        }
    );

    var expected = {
        data: [
            {
                type: 'bar',
                x: [
                    [2013,3,4,0,0], [2013,12,4,0,0], [2014,6,6,0,0], [2014,12,5,0,0]
                ].map(toDate),
                y: [33.01, 32.06, 33.05, 33.5],
                legendgroup: 'Increasing',
                marker: { color: 'rgba(0,0,0,0)' },
                showlegend: false,
                hoverinfo: 'none'
            },
            {
                type: 'bar',
                x: [
                    [2013,3,4,0,0], [2013,12,4,0,0],
                    [2014,6,6,0,0], [2014,12,5,0,0]
                ].map(toDate),
                y: [
                    1.0900000000000034, 1.1199999999999974,
                    0.05000000000000426, 0.20000000000000284
                ],
                marker: { color: '#3D9970' },
                showlegend: false,
                hoverinfo: 'none',
                legendgroup: 'Increasing'
            },
            {
                type: 'scatter',
                mode: 'lines',
                x: [
                    [2013,3,4,0,0], [2013,3,4,0,0], [2013,3,4,0,0], [2013,3,4,0,0], null,
                    [2013,12,4,0,0], [2013,12,4,0,0], [2013,12,4,0,0], [2013,12,4,0,0], null,
                    [2014,6,6,0,0], [2014,6,6,0,0], [2014,6,6,0,0], [2014,6,6,0,0], null,
                    [2014,12,5,0,0], [2014,12,5,0,0], [2014,12,5,0,0], [2014,12,5,0,0], null
                ].map(toDate),
                y: [
                    31.7, 33.01, 34.1, 34.2, null,
                    31.62, 32.06, 33.18, 34.25, null,
                    32.75, 33.05, 33.1, 33.25, null,
                    32.87, 33.5, 33.7, 34.62, null
                ],
                text: [
                    'Low', 'Open', 'Close', 'High', '',
                    'Low', 'Open', 'Close', 'High', '',
                    'Low', 'Open', 'Close', 'High', '',
                    'Low', 'Open', 'Close', 'High', ''
                ],
                name: 'Increasing',
                legendgroup: 'Increasing',
                line: { color: '#3D9970' },
                showlegend: false
            },
            {
                type: 'bar',
                x: [
                    [2013,6,5,0,0], [2013,9,6,0,0],
                    [2014,3,5,0,0], [2014,9,4,0,0]
                ].map(toDate),
                y: [31.93, 33.37, 31.18, 32.93],
                legendgroup: 'Decreasing',
                marker: { color: 'rgba(0,0,0,0)' },
                showlegend: false,
                hoverinfo: 'none'
            },
            {
                type: 'bar',
                x: [
                    [2013,6,5,0,0], [2013,9,6,0,0],
                    [2014,3,5,0,0], [2014,9,4,0,0]
                ].map(toDate),
                y: [
                    1.3800000000000026, 0.13000000000000256,
                    2.9399999999999977, 0.38000000000000256
                ],
                legendgroup: 'Decreasing',
                marker: { color: '#FF4136' },
                showlegend: false,
                hoverinfo: 'none'
            },
            {
                type: 'scatter',
                mode: 'lines',
                x: [
                    [2013,6,5,0,0], [2013,6,5,0,0], [2013,6,5,0,0], [2013,6,5,0,0], null,
                    [2013,9,6,0,0], [2013,9,6,0,0], [2013,9,6,0,0], [2013,9,6,0,0], null,
                    [2014,3,5,0,0], [2014,3,5,0,0], [2014,3,5,0,0], [2014,3,5,0,0], null,
                    [2014,9,4,0,0], [2014,9,4,0,0], [2014,9,4,0,0], [2014,9,4,0,0], null
                ].map(toDate),
                y: [
                    30.75, 31.93, 33.31, 34.37, null,
                    32.87, 33.37, 33.5, 33.62, null,
                    30.81, 31.18, 34.12, 35.18, null,
                    32.75, 32.93, 33.31, 35.37, null
                ],
                text: [
                    'Low', 'Close', 'Open', 'High', '',
                    'Low', 'Close', 'Open', 'High', '',
                    'Low', 'Close', 'Open', 'High', '',
                    'Low', 'Close', 'Open', 'High', ''
                ],
                name: 'Decreasing',
                legendgroup: 'Decreasing',
                line: { color: '#FF4136' },
                showlegend: false
            }
        ],
        layout: {
            barmode: 'stack',
            bargroupgap: 0.2,
            yaxis: { 
                fixedrange: true,
                range: [30.288, 35.831999999999994]
            }
        }
    };

    t.same(fig.data, expected.data);
});
