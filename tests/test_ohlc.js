'use strict';

var tap = require('tap');

var createOHLC = require('../src/ohlc');

tap.test('should output ohlc fig object - 1', function(t) {
    t.plan(1);

    var fig = createOHLC(
        { open: [33.0], high: [33.2], low: [32.7], close: [33.1] }
    );

    var expected = {
        data: [
            {
                type: 'scatter',
                mode: 'lines',
                x: [-0.2, 0, 0, 0, 0, 0.2, null],
                y: [33, 33, 33.2, 32.7, 33.1, 33.1, null],
                text: ['Open', 'Open', 'High', 'Low', 'Close', 'Close', ''],
                name: 'Increasing',
                line: { width: 1, color: '#3D9970' },
                showlegend: false
            },
            {
                type: 'scatter',
                mode: 'lines',
                x: [],
                y: [],
                text: [],
                name: 'Decreasing',
                line: { width: 1, color: '#FF4136' },
                showlegend: false
            }
        ],
        layout: {
            xaxis: {
                type: 'linear',
                zeroline: false
            },
            hovermode: 'closest'
        }
    };

    t.same(fig, expected);
});

tap.test('should output ohlc fig object - 2', function(t) {
    t.plan(1);

    var fig = createOHLC(
        { open: [33.0], high: [33.2], low: [32.7], close: [33.1] },
        { direction: 'increasing' }
    );

    var expected = {
        data: [
            {
                type: 'scatter',
                mode: 'lines',
                x: [-0.2, 0, 0, 0, 0, 0.2, null],
                y: [33, 33, 33.2, 32.7, 33.1, 33.1, null],
                text: ['Open', 'Open', 'High', 'Low', 'Close', 'Close', ''],
                name: 'Increasing',
                line: { width: 1, color: '#3D9970' },
                showlegend: false
            }
        ],
        layout: {
            xaxis: {
                type: 'linear',
                zeroline: false
            },
            hovermode: 'closest'
        }
    };

    t.same(fig, expected);
});


tap.test('should output ohlc fig object - 3', function(t) {
    t.plan(1);

    var fig = createOHLC(
        { open: [33.0], high: [33.2], low: [30.7], close: [31.1] },
        { direction: 'decreasing' }
    );

    var expected = {
        data: [
            {
                type: 'scatter',
                mode: 'lines',
                x: [-0.2, 0, 0, 0, 0, 0.2, null],
                y: [33, 33, 33.2, 30.7, 31.1, 31.1, null],
                text: ['Open', 'Open', 'High', 'Low', 'Close', 'Close', ''],
                name: 'Decreasing',
                line: { width: 1, color: '#FF4136' },
                showlegend: false
            }
        ],
        layout: {
            xaxis: {
                type: 'linear',
                zeroline: false
            },
            hovermode: 'closest'
        }
    };

    t.same(fig, expected);
});

tap.test('should output ohlc fig object - 4', function(t) {
    t.plan(1);

    function toDate(d) {
        return d!== null ?
            new Date(d[0], d[1]-1, d[2], d[3], d[4]).getTime() :
            null;
    }

    var fig = createOHLC(
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
                type: 'scatter',
                mode: 'lines',
                x: [
                    [2013,2,14,4,36], [2013,3,4,0,0], [2013,3,4,0,0],
                    [2013,3,4,0,0], [2013,3,4,0,0], [2013,3,21,20,24], null,
                    [2013,11,16,4,36], [2013,12,4,0,0], [2013,12,4,0,0],
                    [2013,12,4,0,0], [2013,12,4,0,0], [2013,12,21,19,24], null,
                    [2014,5,19,4,36], [2014,6,6,0,0], [2014,6,6,0,0],
                    [2014,6,6,0,0], [2014,6,6,0,0], [2014,6,23,19,24], null,
                    [2014,11,17,4,36], [2014,12,5,0,0], [2014,12,5,0,0],
                    [2014,12,5,0,0], [2014,12,5,0,0], [2014,12,22,19,24], null
                ].map(toDate),
                y: [
                    33.01, 33.01, 34.2, 31.7, 34.1, 34.1, null,
                    32.06, 32.06, 34.25, 31.62, 33.18, 33.18, null,
                    33.05, 33.05, 33.25, 32.75, 33.1, 33.1, null,
                    33.5, 33.5, 34.62, 32.87, 33.7, 33.7, null
                ],
                text: [
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', '',
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', '',
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', '',
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', ''
                ],
                name: 'Increasing',
                line: { width: 1, color: '#3D9970' },
                showlegend: false
            },
            {
                type: 'scatter',
                mode: 'lines',
                x: [
                    [2013,5,18,4,36], [2013,6,5,0,0], [2013,6,5,0,0], 
                    [2013,6,5,0,0], [2013,6,5,0,0], [2013,6,22,19,24], null,
                    [2013,8,19,4,36], [2013,9,6,0,0], [2013,9,6,0,0], 
                    [2013,9,6,0,0], [2013,9,6,0,0], [2013,9,23,19,24], null,
                    [2014,2,15,4,36], [2014,3,5,0,0], [2014,3,5,0,0],
                    [2014,3,5,0,0], [2014,3,5,0,0], [2014,3,22,20,24], null,
                    [2014,8,17,4,36], [2014,9,4,0,0], [2014,9,4,0,0],
                    [2014,9,4,0,0], [2014,9,4,0,0], [2014,9,21,19,24], null
                ].map(toDate),
                y: [
                    33.31, 33.31, 34.37, 30.75, 31.93, 31.93, null,
                    33.5, 33.5, 33.62, 32.87, 33.37, 33.37, null,
                    34.12, 34.12, 35.18, 30.81, 31.18, 31.18, null,
                    33.31, 33.31, 35.37, 32.75, 32.93, 32.93, null
                ],
                text: [
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', '',
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', '',
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', '',
                    'Open', 'Open', 'High', 'Low', 'Close', 'Close', ''
                ],
                name: 'Decreasing',
                line: { width: 1, color: '#FF4136' },
                showlegend: false
            }
        ],
        layout: {
            xaxis: {
                type: 'date',
                zeroline: false
            },
            hovermode: 'closest'
        }
    };

    t.same(fig, expected);
});
