'use strict';

// Flat extend function (only copies values of first level keys)
module.exports = function extendFlat(obj1, obj2) {
    var objOut = {};

    function copyToOut(obj) {
        var keys = Object.keys(obj);
        for(var i = 0; i < keys.length; i++) {
            objOut[keys[i]] = obj[keys[i]];
        }
    }

    if(typeof obj1 === 'object') copyToOut(obj1);
    if(typeof obj2 === 'object') copyToOut(obj2);

    return objOut;
};

