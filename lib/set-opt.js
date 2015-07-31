'use strict';

module.exports = function setOpt(opt, settings) {
    if(settings.dflt === undefined) return opt;

    var allowedValues = [settings.dflt];

    if(settings.values !== undefined) {
        allowedValues = allowedValues.concat(settings.values);
        if(allowedValues.indexOf(opt) === -1) opt = settings.dflt;
    }
    else {
        opt = opt===undefined ? settings.dflt : opt;
    }

    return opt;
};
