var flatten2dArray = require('../lib/flatten-2d-array');

function ohlcFactory(data) {
    this.open = data.open;
    this.high = data.high;
    this.low = data.low;
    this.close = data.close;
    this.dates = data.dates;

    this.len = this.open.length;
    this.textSignature = ['Open', 'Open', 'High', 'Low', 'Close', 'Close', ''];

    this.allX = [];
    this.allY = [];
    this.incrX = [];
    this.incrY = [];
    this.decrX = [];
    this.decrY = [];

    this.getAllXY();
    this.seperateIncrDecr();
}

module.exports = ohlcFactory;

var proto = ohlcFactory.prototype;

proto.getAllXY = function() {
    var self = this,
        dateDiff = [];

    var dateDiffMin, i;

    for(i = 0; i < self.len; i++) {
        self.allY.push([
            self.open[i],
            self.open[i], self.high[i],
            self.low[i], self.close[i],
            self.close[i],
            null
        ]);
    }

    if(self.dates[0] instanceof Date) {
        for(i = 0; i < self.len-1; i++) {
            dateDiff.push(self.dates[i+1].getTime() - self.dates[i].getTime());
        }
        dateDiffMin = Math.min.apply(null, dateDiff) / 5;

        self.dates.forEach(function(datei) {
            datei = datei.getTime();
            self.allX.push([
                datei - dateDiffMin,
                datei, datei, datei, datei,
                datei + dateDiffMin, null
            ]);
        });
    }
    else {
        self.open.forEach(function(_, i) {
            self.allX.push([
                i - 0.2,
                i, i, i, i,
                i + 0.2, null
            ]);
        });
    }
};

proto.seperateIncrDecr = function() {
    var self = this;

    for(var i = 0; i < self.len; i++) {
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

proto.getIncrData = function() {
    var self = this,
        text = [];

    self.incrX.forEach(function() { text = text.concat(self.textSignature); });

    return {
        x: flatten2dArray(self.incrX),
        y: flatten2dArray(self.incrY),
        text: text
    };
};

proto.getDecrData = function() {
    var self = this,
        text = [];

    self.decrX.forEach(function() { text = text.concat(self.textSignature); });

    return {
        x: flatten2dArray(self.decrX),
        y: flatten2dArray(self.decrY),
        text: text
    };
};
