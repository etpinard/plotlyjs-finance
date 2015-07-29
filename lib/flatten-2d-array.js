'use strict';

module.exports = function flatten2dArray(array2d) {
    return [].concat.apply([], array2d);
};
