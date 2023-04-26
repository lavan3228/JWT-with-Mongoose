// English   
const enDict: any = {
    'INVALID-ROLE': 'Given Role is Invalid',
    'SOME-THING-WENT-WRONG': 'Internal error occured. Please contact your admin.',
};

export const getValue = (key: any) => {
    return enDict[key] || key;
};