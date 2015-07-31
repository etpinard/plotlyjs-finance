'use strict';

module.exports = function setArrays(objOfArrays, keysRequired, keysOptional) {
    var minLength = Infinity;
    var i, key, array;

    Object.keys(objOfArrays).forEach(function(key) {
        var attr = objOfArrays[key];
        if(!Array.isArray(attr)) return;
        if(attr.length < minLength) minLength = attr.length;
    });

    for(i = 0; i < keysRequired.length; i++) {
        key = keysRequired[i];
        array = objOfArrays[key];
        if(array === undefined) return false;
        if(array.length > minLength) objOfArrays[key] = array.slice(0, minLength);
    }

    if(keysOptional !== undefined) {
        for(i = 0; i < keysOptional.length; i++) {
            key = keysOptional[i];
            array = objOfArrays[key];
            if(array === undefined) objOfArrays[key] = new Array(minLength);
            else if(array.length > minLength) objOfArrays[key] = array.slice(0, minLength);
        }
    }

    return objOfArrays;
};
