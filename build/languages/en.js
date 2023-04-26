"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
// English   
const enDict = {
    'INVALID-ROLE': 'Given Role is Invalid',
    'SOME-THING-WENT-WRONG': 'Internal error occured. Please contact your admin.',
};
const getValue = (key) => {
    return enDict[key] || key;
};
exports.getValue = getValue;
