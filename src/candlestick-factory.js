'use strict';

function candlestickFactory(data) {
    this.open = data.open;
    this.high = data.high;
    this.low = data.low;
    this.close = data.close;

    this.len = this.open.length;
    this.x = (data.dates[0] instanceof Date) ? 
        data.dates.map(function(date) { return date.getTime(); }) : 
        this.open.map(function(_, i) { return i; });
}

module.exports = candlestickFactory;

var proto = candlestickFactory.prototype;

proto.getIncrData = function() {
    var self = this,
        textSignature = ['Low', 'Open', 'Close', 'High', ''];

    var x = [], open = [], diff = [], xStick = [], yStick = [], text = [];

    for(var i = 0; i < self.len; i++) {
        if(self.close[i] > self.open[i]) {
            x.push(self.x[i]);
            open.push(self.open[i]);
            diff.push(self.close[i] - self.open[i]);
            xStick = xStick.concat([
                self.x[i], self.x[i], self.x[i], self.x[i], null]
            );
            yStick = yStick.concat([
                self.low[i], self.open[i], self.close[i], self.high[i], null
            ]);
            text = text.concat(textSignature);
        }
    }

    return {
        x: x, open: open, diff: diff,
        xStick: xStick, yStick: yStick, text: text
    };
};

proto.getDecrData = function() {
    var self = this,
        textSignature = ['Low', 'Close', 'Open', 'High', ''];

    var x = [], close = [], diff = [], xStick = [], yStick = [], text = [];

    for(var i = 0; i < self.len; i++) {
        if(self.close[i] <= self.open[i]) {
            x.push(self.x[i]);
            close.push(self.close[i]);
            diff.push(self.open[i] - self.close[i]);
            xStick = xStick.concat([
                self.x[i], self.x[i], self.x[i], self.x[i], null]
            );
            yStick = yStick.concat([
                self.low[i], self.close[i], self.open[i], self.high[i], null
            ]);
            text = text.concat(textSignature);
        }
    }

    return {
        x: x, close: close, diff: diff,
        xStick: xStick, yStick: yStick, text: text
    };
};
