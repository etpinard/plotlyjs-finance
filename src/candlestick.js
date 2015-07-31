'use strict';

var setArrays = require('../lib/set-arrays'),
    setOpt = require('../lib/set-opt'),
    extendFlat = require('../lib/extend-flat'),
    consts = require('../lib/consts');

var candlestickFactory = require('./candlestick-factory'),
    validateData = require('./validate-data');

var candlestick = module.exports = {};

/**
 * @param {object} data
 * @param {string} direction
 * @param {object} opts
 *
**/
candlestick.create = function(data, opts) {
    data = setArrays(data, ['open', 'high', 'low', 'close'], ['dates']);
    if(!data) return;
    validateData(data);

    if(opts === undefined) opts = {};
    var direction = setOpt(opts.direction,
        {dflt: 'both', values: ['increasing', 'decreasing']}
    );
    delete opts.direction;  // direction isn't a plot option

    var factory = new candlestickFactory(data),
        traces = [];

    if(['both', 'increasing'].indexOf(direction) !== -1) {
        traces = traces.concat(makeIncreasing(factory, opts));
    }
    if(['both', 'decreasing'].indexOf(direction) !== -1) {
        traces = traces.concat(makeDecreasing(factory, opts));
    }

    return {
        data: traces,
        layout: {
            barmode: 'stack',
            bargroupgap: 0.2,
            yaxis: {
                range: getYAxisRange(data),
                fixedrange: true
            }
        }
    };
};

function makeIncreasing(factory, opts) {
    var incrData = factory.getIncrData(),
        groupName = 'Increasing';

    return [
        {
            type: 'bar',
            x: incrData.x,
            y: incrData.open,
            marker: { color: consts.TRANSPARENT },
            legendgroup: groupName,
            showlegend: false,
            hoverinfo: 'none'
        },
        extendFlat(
            {
                type: 'bar',
                x: incrData.x,
                y: incrData.diff,
                legendgroup: groupName,
                marker: setOpt(opts.marker,
                    {dflt: {color: consts.DEFAULT_INCREASING_COLOR}}
                ),
                showlegend: false,
                hoverinfo: 'none'
            },
            opts
        ),
        extendFlat(
            {
                type: 'scatter',
                mode: 'lines',
                x: incrData.xStick,
                y: incrData.yStick,
                text: setOpt(opts.text, {dflt: incrData.text}),
                name: setOpt(opts.name, {dflt: groupName}),
                legendgroup: groupName,
                line: setOpt(opts.line,
                    {dflt: {color: consts.DEFAULT_INCREASING_COLOR}}
                ),
                showlegend: opts.name!==undefined
            },
            opts
        )
    ];
}

function makeDecreasing(factory, opts) {
    var decrData = factory.getDecrData(),
        groupName = 'Decreasing';

    return [
        {
            type: 'bar',
            x: decrData.x,
            y: decrData.close,
            marker: { color: consts.TRANSPARENT },
            legendgroup: groupName,
            showlegend: false,
            hoverinfo: 'none'
        },
        extendFlat(
            {
                type: 'bar',
                x: decrData.x,
                y: decrData.diff,
                legendgroup: groupName,
                marker: setOpt(opts.marker,
                    {dflt: {color: consts.DEFAULT_DECREASING_COLOR}}
                ),
                showlegend: false,
                hoverinfo: 'none'
            },
            opts
        ),
        extendFlat(
            {
                type: 'scatter',
                mode: 'lines',
                x: decrData.xStick,
                y: decrData.yStick,
                text: setOpt(opts.text, {dflt: decrData.text}),
                name: setOpt(opts.name, {dflt: groupName}),
                legendgroup: groupName,
                line: setOpt(opts.line,
                    {dflt: {color: consts.DEFAULT_DECREASING_COLOR}}
                ),
                showlegend: opts.name!==undefined
            },
            opts
        )
    ];
}

function getYAxisRange(data) {
    var minLow = Math.min(data.low),
        maxHigh = Math.max(data.high),
        diff = maxHigh-minLow;
    return [minLow - 0.1*diff, maxHigh + 0.1*diff];
}
