'use strict';

var tap = require('tap');

var setOpt = require('../lib/set-opt');

tap.test('should honour input when no \'values\' isn\'t set', function(t) {
    t.plan(1);
    t.equal(
        setOpt('input', {dflt: 'the default'}),
        'input'
    );
});

tap.test('should default when input isn\'t part of \'values\'', function(t) {
    t.plan(1);
    t.equal(
        setOpt('input', {dflt: 'the default', values: ['val1', 'val2']}),
        'the default'
    );
});

tap.test('should not default when input is part of \'values\'', function(t) {
    t.plan(1);
    t.equal(
        setOpt('val2', {dflt: 'the default', values: ['val1', 'val2']}),
        'val2'
    );
});
