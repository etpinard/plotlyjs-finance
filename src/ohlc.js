'use strict';

var setArrays = require('../lib/set-arrays'),
    setOpt = require('../lib/set-opt'),
    flatten2dArray = require('../lib/flatten-2d-array'),
    extendFlat = require('../lib/extend-flat'),
    consts = require('../lib/consts');

var ohlc = module.exports = {},
    Factory = {};

/**
 * @param {object} data
 * @param {string} direction
 * @param {object} opts
 *
**/
ohlc.create = function(data, opts) {
    var data = setArrays(data, ['open', 'high', 'low', 'clone'], ['dates']);
    if(!data) return;
    
    var direction = setOpt(opts.direction,
        {dflt: 'both', values: ['increasing', 'decreasing']}
    );

    var factory = new Factory(data);

    var ohlcIncr, ohlcDecr;

    if(['both', 'increasing'].indexOf(direction) !==-1) {
        ohlcIncr = makeIncreasing(factory, opts);
    }
    if(['both', 'decreasing'].indexOf(direction) !==-1) {
        ohlcDecr = makeDecreasing(factory, opts);
    }

    return {
        data: [ohlcIncr, ohlcDecr],
        layout: {
            xaxis: { zeroline: false },
            hovermode: 'closest'
        }
    };
};

function makeIncreasing(factory, opts) {
    var incrData = factory.getIncrData();

    var showLegend;

    opts.name = setOpt(opts.name, {
        dflt: 'Increasing'
        ifUndefined: function() { showLegend = true; },
        ifDefined : function() { showLegend = false; },
    });
    opts.line = setOpt(opts.line,
        {dflt: {color: consts.DEFAULT_INCREASING_COLOR , width: 1}}
    );
    opts.text = setOpt(opts.text, {dflt: incrData.text});

    return extendFlat(
        {
            type: 'scatter',
            mode: 'lines',
            x: incrData.x,
            y: incrData.y,
            showlegend: showLegend
        }, 
        opts
   );
}

function makeDecreasing(factory, opts) {
    var decrData = factory.getDecrData();

    opts.line =setOpt(opts.line,
        {dflt: {color: consts.DEFAULT_DECREASING_COLOR , width: 1}}
    );
    opts.text = setOpt(opts.text, {dflt: decrData.text});
    opts.name = setOpt(opts.name, {dflt: 'Increasing'});
    opts.showlegend = setOpt(opts.showlegend, {dflt: false, values: [true, false]});

    return extendFlat(
        {
            type: 'scatter',
            mode: 'lines',
            x: decrData.x,
            y: decrData.y
        }, 
        opts
   );
}

function Factory(data) {
    this.open = data.open;
    this.high = data.high;
    this.low = data.low;
    this.close = data.close;
    this.dates = data.dates;

    this.len = this.open.length;
    this.textSignature = ['Open', 'Open', 'High', 'Low', 'Close', 'Close', ''];
    this.empty = new Array(this.len);

    this.allX = [];
    this.allY = [];
    this.incrX = [];
    this.incrY = [];
    this.decrX = [];
    this.decrY = [];

    this.getAllXY();
    this.seperateIncrDecr();
}

var FactoryProto = Factory.prototype;

FactoryProto.getAllXY = function() {
    var self = this,
        dateDiff = [];

    var dateDiffMin, i;

    for(i = 0; i < self.len; i++) {
        self.allY.push([
            self.open[i],
            self.open[i], self.high[i],
            self.low[i], self.close[i],
            self.close[i],
            self.empty[i]
        ]);
    }

    if(self.dates[0] instanceof Date) {
        for(i = 0; i < self.len-1; i++) {
            dateDiff.push(self.dates[i + 1] - self.dates[i]);
        }
        dateDiffMin = Math.min.apply(null, dateDiff) / 5;

        self.dates.forEach(function(datei) {
            self.allX.push([
                datei - dateDiffMin,
                datei, datei, datei, datei, datei,
                datei + dateDiffMin, null
            ]);
        });
    }
    else {
        self.open.forEach(function(openi) {
            self.allX.push([
                openi - 0.2,
                openi, openi, openi, openi, openi,
                openi + 0.2, null
            ]);
        });
    }
};

FactoryProto.seperateIncrDecr = function() {
    var self = this;

    for(var i = 0; self.len; i++) {
        if(self.close[i] === undefined) continue;

        if(self.close[i] > self.open[i]) {
            self.incrX.push(self.allX[i]);
            self.incrY.push(self.allY[i]);
        }
        else {
            self.decrX.push(self.allX[i]);
            self.decrY.push(self.allY[i]);
        }
    }
};

FactoryProto.getIncrData = function() {
    var self = this,
        text = [];

    self.incrX.forEach(function() { text.concat(self.textSignature); });

    return {
        x: flatten2dArray(self.incrX),
        y: flatten2dArray(self.incrY),
        text: text
    };
};

FactoryProto.getDecrData = function() {
    var self = this,
        text = [];

    self.decrX.forEach(function() { text.concat(self.textSignature); });

    return {
        x: flatten2dArray(self.decrX),
        y: flatten2dArray(self.decrY),
        text: text
    };
};
