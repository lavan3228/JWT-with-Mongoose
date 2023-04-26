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
        var isDebug = process.env.IS_LOG_DEBUG || false;
        if (isDebug === 'true') {
            if (_.isEmpty(args)) {
                console.log(this.emptyLogMsg);
            } else {
                this.log(reqLogObj, args, 'info');
                // console.log(args);
            }
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
            this.log(reqLogObj, args, 'error');
            // console.log(args);
        }
    }

    /** 
     * Debug log
     * @param logObject
     */
    debug(reqLogObj: any) {
        var args = Array.from(arguments);
        var isDebug = process.env.IS_LOG_DEBUG || false;
        if (isDebug === 'true') {
            if (_.isEmpty(args)) {
                console.log(this.emptyLogMsg);
            }
            else {
                this.log(reqLogObj, args, 'debug');
                // console.log(args);
            }
        }
    }

    /** 
     * Warning log
     * @param logObject
     */
    warn(reqLogObj: any) {
        var args = Array.from(arguments);
        if (_.isEmpty(args)) {
            console.log(this.emptyLogMsg);
        } else {
            this.log(reqLogObj, args, 'warn');
            // console.log(args);
        }
    }

    /** 
     * Get all log variables
     */
    private getLogVariables() {
        return {
            defaultLogObj: {
                service: process.env.SERVICE_NAME || '', //* Docker container service name
                created_at: new Date(), //* Current date
                user_id: '', //* User Id
                className: this.className || '', //* Log Function calle class name
                logType: '' //* Log type eg: 'info'
            },
            reqHeadersLogObj: {
                url: '', //* Request url 
                http_method: '', //* Http method
                request: '', //* Request data from body.attributes or query depends on method
                source: '', //* Request come from which source eg. 1X-PH 
                device_type: '', //* Request come from which device
                user_agent: '', //* Rquest user-agent eg. Chrome
                referrer_url: '', //* Referrer url is orignal url where actual request come
                app_id: '', //* Request App id 
                ip: '' //* Request come from which ip
            },
            dynamicLogObj: {
                uniqId: httpContext.get('req_id') || '', //* Every request have http context unique id 
                req: '', //* Request data
                jsonObject: '', //* Response or json log data
                description: '', //* Log description eg: 'Update order id',
                arguments: '' //* Extra log arguments show here only for production
            }
        }
    }

    /** 
     * Prepare and get log header object from req
     */
    private getLogReqHeaderObj(reqHeadersLogObj: any, logHttpReqFlag: any) {
        //* Get req data from http context
        var req = httpContext.get('req');
        // console.log('---------------- req ',req);   
        if (logHttpReqFlag && !_.isEmpty(req)) {
            reqHeadersLogObj.http_method = req.method || '';
            if (req.query) {
                reqHeadersLogObj.request = req.query;
            }
            if (req.body) {
                reqHeadersLogObj.request = req.body.attributes || '';
            }
            // if (req.headers) {
            //     reqHeadersLogObj.url = req.protocol + '://' + req.get(logReqHeader.HOST) + req.originalUrl;
            //     reqHeadersLogObj.source = req.headers[logReqHeader.SOURCE] || '';
            //     reqHeadersLogObj.device_type = req.headers[logReqHeader.DEVICE_TYPE] || '';
            //     reqHeadersLogObj.user_agent = req.headers[logReqHeader.USER_AGENT] || '';
            //     reqHeadersLogObj.referrer_url = req.headers[logReqHeader.REFERRER_URL] || '';
            //     reqHeadersLogObj.app_id = req.headers[logReqHeader.APP_ID] || '';
            //     reqHeadersLogObj.ip = req.headers[logReqHeader.IP] || req.connection.remoteAddress
            // }

            return reqHeadersLogObj;
        } else {
            return reqHeadersLogObj;
        }

    }

    /** 
     * Modify & console log object
     * 
     * @param logObject
     */
    private log(reqLogObj: any, args: any, logType: any) {
        //* Get all log objects
        var logVariables = this.getLogVariables();

        //* Deafault log objects
        let defaultLogObj: any = logVariables.defaultLogObj;

        //* Request headers log object
        let reqHeadersLogObj = this.getLogReqHeaderObj(logVariables.reqHeadersLogObj, reqLogObj.logHttpReq || '');

        //* Dynamic log objetcs
        let dynamicLogObj = logVariables.dynamicLogObj;

        defaultLogObj.user_id = (reqLogObj.req || '').id || '';
        defaultLogObj.logType = logType;
        //? For now 'functionName' we identify by debuging uniqId

        if (process.env.IS_DEVELOPMENT == 'true') {
            if (typeof reqLogObj == 'object') {
                if (reqLogObj.jsonObject || reqLogObj.req) {
                    // * Check for error object. If found than directly get error.stack. Because stack is string type
                    if (_.isError(reqLogObj.jsonObject)) {
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject.stack || reqLogObj.jsonObject
                    } else {
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject || '';
                    }
                    dynamicLogObj.req = reqLogObj.req || '';
                    dynamicLogObj.description = reqLogObj.description || '';

                    //* Remove first argument in argumnets array
                    _.pullAt(args, [0]);

                    //* Merge request log object if 'logHttpReq' = true
                    if (reqLogObj.logHttpReq) {
                        _.merge(dynamicLogObj, reqHeadersLogObj);
                    }

                    delete defaultLogObj.service;
                    delete defaultLogObj.created_at;
                    delete defaultLogObj.logType;

                    _.merge(dynamicLogObj, defaultLogObj);

                    // console[logType](dynamicLogObj, args);
                } else {
                    // console[logType](dynamicLogObj, args);
                }
            } else {
                // console[logType](dynamicLogObj, args);
            }

        } else {

            if (typeof reqLogObj == 'object') {
                if (reqLogObj.jsonObject || reqLogObj.req) {
                    // * Check for error object. If found than directly get error.stack. Because stack is string type
                    if (_.isError(reqLogObj.jsonObject)) {
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject.stack || reqLogObj.jsonObject
                    } else {
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject || '';
                    }
                    dynamicLogObj.req = reqLogObj.req || '';
                    dynamicLogObj.description = reqLogObj.description || '';


                    //* Remove first argument in argumnets array
                    _.pullAt(args, [0]);

                    //* Add all extra arguments to arguments field
                    dynamicLogObj.arguments = args || [];

                    //* Merge log objects
                    var finalLogObj = JSON.stringify({
                        ...defaultLogObj,
                        ...reqHeadersLogObj,
                        ...dynamicLogObj
                    });
                    // console[logType](finalLogObj);
                } else {
                    printProductionConsoleLog();
                }
            } else {
                printProductionConsoleLog();
            }

            function printProductionConsoleLog() {
                dynamicLogObj.arguments = args;
                var finalLogObj = JSON.stringify({
                    ...defaultLogObj,
                    ...reqHeadersLogObj,
                    ...dynamicLogObj
                });
                // console[logType](finalLogObj);
            }

            // TODO: Call filebeat or fluentd
        }

        return true;
    }
}

export const logger = Logger;
