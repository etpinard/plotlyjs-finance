'use strict';

var tap = require('tap');

var setArray = require('../lib/set-arrays');

tap.test('should slice required arrays', function(t) {
    t.plan(1);

    var data = {
        open: [1,2,3,1,2],
        high: [2,1,2],
        low: [2,3,1],
        close: [2,3,3,1,2,2]
    };

    t.same(
        setArray(data, ['open', 'high', 'low', 'close']),
        {
            open: [1,2,3],
            high: [2,1,2],
            low: [2,3,1],
            close: [2,3,3]
        }
    );
});

tap.test('should slice optional arrays - if given', function(t) {
    t.plan(1);

    var data = {
        open: [1,2,3,1,2],
        high: [2,1,2],
        low: [2,3,1],
        close: [2,3,3,1,2,2],
        dates: ['a','b','c','d']
    };
   
    t.same(
        setArray(data, ['open', 'high', 'low', 'close'], ['dates']),
        {
            open: [1,2,3],
            high: [2,1,2],
            low: [2,3,1],
            close: [2,3,3],
            dates: ['a','b','c']
        }
    );
});

tap.test('should initialize optional arrays - if not given', function(t) {
    t.plan(1);
    var data = {
        open: [1,2,3,1,2],
        high: [2,1,2],
        low: [2,3,1],
        close: [2,3,3,1,2,2]
    };
    
    t.same(
        setArray(data, ['open', 'high', 'low', 'close'], ['dates']),
        {
            open: [1,2,3],
            high: [2,1,2],
            low: [2,3,1],
            close: [2,3,3],
            dates: [ , , ]
        }
    );
   
});
