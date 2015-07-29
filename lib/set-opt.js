'use strict';

module.exports = function setOpt(opt, settings) {
    if(settings.dflt === undefined) return opt;

    var allowedValues = settings.dflt;
    if(settings.values !== undefined) allowedValues.concat(settings.values);

    if(allowedValues.indexOf(opt) === -1) opt = settings.dflt;

    if(typeof settings.ifUndefined === 'function' && opt === undefined) {
        settings.ifUndefined();
    }

    if(typeof settings.ifDefined === 'function' && opt !== undefined) {
        settings.ifDefined();
    }

    return opt;
};
