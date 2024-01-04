import * as _ from 'lodash';
import * as env from 'dotenv';
import 'json-circular-stringify';
import * as httpContext from 'express-http-context';

env.config();
class Logger {

    className: string;
    emptyLogMsg = '-- Logger Warning: Nothing to log';
    constructor(className: any) {
        this.className = className;
    }

    /**
     * Info log
     * @param logObject
     */
    info(reqLogObj: any) {
        var args = Array.from(arguments);
        if (_.isEmpty(args)) {
            console.log(this.emptyLogMsg);
        } else {
            // this.log(reqLogObj, args, 'info');
            console.log(args, "kkkk");
        }
    }

    /** 
     * Error log
     * @param logObject
     */
    error(reqLogObj: any) {
        var args = Array.from(arguments);
        if (_.isEmpty(args)) {
            console.log(this.emptyLogMsg);
        } else {
            // this.log(reqLogObj, args, 'error');
            console.log(args);
        }
    }

}

export const logger = Logger;
