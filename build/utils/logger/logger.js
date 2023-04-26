"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const _ = __importStar(require("lodash"));
const env = __importStar(require("dotenv"));
require("json-circular-stringify");
const httpContext = __importStar(require("express-http-context"));
env.config();
class Logger {
    constructor(className) {
        this.emptyLogMsg = '-- Logger Warning: Nothing to log';
        this.className = className;
    }
    /**
     * Info log
     * @param logObject
     */
    info(reqLogObj) {
        var args = Array.from(arguments);
        var isDebug = process.env.IS_LOG_DEBUG || false;
        if (isDebug === 'true') {
            if (_.isEmpty(args)) {
                console.log(this.emptyLogMsg);
            }
            else {
                this.log(reqLogObj, args, 'info');
                // console.log(args);
            }
        }
    }
    /**
     * Error log
     * @param logObject
     */
    error(reqLogObj) {
        var args = Array.from(arguments);
        if (_.isEmpty(args)) {
            console.log(this.emptyLogMsg);
        }
        else {
            this.log(reqLogObj, args, 'error');
            // console.log(args);
        }
    }
    /**
     * Debug log
     * @param logObject
     */
    debug(reqLogObj) {
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
    warn(reqLogObj) {
        var args = Array.from(arguments);
        if (_.isEmpty(args)) {
            console.log(this.emptyLogMsg);
        }
        else {
            this.log(reqLogObj, args, 'warn');
            // console.log(args);
        }
    }
    /**
     * Get all log variables
     */
    getLogVariables() {
        return {
            defaultLogObj: {
                service: process.env.SERVICE_NAME || '',
                created_at: new Date(),
                user_id: '',
                className: this.className || '',
                logType: '' //* Log type eg: 'info'
            },
            reqHeadersLogObj: {
                url: '',
                http_method: '',
                request: '',
                source: '',
                device_type: '',
                user_agent: '',
                referrer_url: '',
                app_id: '',
                ip: '' //* Request come from which ip
            },
            dynamicLogObj: {
                uniqId: httpContext.get('req_id') || '',
                req: '',
                jsonObject: '',
                description: '',
                arguments: '' //* Extra log arguments show here only for production
            }
        };
    }
    /**
     * Prepare and get log header object from req
     */
    getLogReqHeaderObj(reqHeadersLogObj, logHttpReqFlag) {
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
        }
        else {
            return reqHeadersLogObj;
        }
    }
    /**
     * Modify & console log object
     *
     * @param logObject
     */
    log(reqLogObj, args, logType) {
        //* Get all log objects
        var logVariables = this.getLogVariables();
        //* Deafault log objects
        let defaultLogObj = logVariables.defaultLogObj;
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
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject.stack || reqLogObj.jsonObject;
                    }
                    else {
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
                }
                else {
                    // console[logType](dynamicLogObj, args);
                }
            }
            else {
                // console[logType](dynamicLogObj, args);
            }
        }
        else {
            if (typeof reqLogObj == 'object') {
                if (reqLogObj.jsonObject || reqLogObj.req) {
                    // * Check for error object. If found than directly get error.stack. Because stack is string type
                    if (_.isError(reqLogObj.jsonObject)) {
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject.stack || reqLogObj.jsonObject;
                    }
                    else {
                        dynamicLogObj.jsonObject = reqLogObj.jsonObject || '';
                    }
                    dynamicLogObj.req = reqLogObj.req || '';
                    dynamicLogObj.description = reqLogObj.description || '';
                    //* Remove first argument in argumnets array
                    _.pullAt(args, [0]);
                    //* Add all extra arguments to arguments field
                    dynamicLogObj.arguments = args || [];
                    //* Merge log objects
                    var finalLogObj = JSON.stringify(Object.assign(Object.assign(Object.assign({}, defaultLogObj), reqHeadersLogObj), dynamicLogObj));
                    // console[logType](finalLogObj);
                }
                else {
                    printProductionConsoleLog();
                }
            }
            else {
                printProductionConsoleLog();
            }
            function printProductionConsoleLog() {
                dynamicLogObj.arguments = args;
                var finalLogObj = JSON.stringify(Object.assign(Object.assign(Object.assign({}, defaultLogObj), reqHeadersLogObj), dynamicLogObj));
                // console[logType](finalLogObj);
            }
            // TODO: Call filebeat or fluentd
        }
        return true;
    }
}
exports.logger = Logger;
