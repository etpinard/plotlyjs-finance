'use strict';

module.exports = function validateData(data) {
    [data.open, data.low, data.close].forEach(function(array) {
        data.high.forEach(function(highi, i) {
            if(highi < array[i]) {
                throw new Error([
                    'Oops! Looks like some of your high values',
                    'are less than the corresponding open,',
                    'low, or close values.'
                ].join(' '));
            }
        });
    });

    [data.open, data.high, data.close].forEach(function(array) {
        data.low.forEach(function(lowi, i) {
            if(lowi > array[i]) {
                throw new Error([
                    'Oops! Looks like some of your low values',
                    'are greather than the corresponding open,', 
                    'high, or close values.'
                ].join(' '));
            }
        });
    });
}
