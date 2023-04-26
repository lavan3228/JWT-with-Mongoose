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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const zlib = __importStar(require("zlib"));
const languages_1 = require("../languages");
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('APIResponse');
class APIResponse {
    send(req, res, data, textMessage = '', status = 200) {
        return __awaiter(this, void 0, void 0, function* () {
            const respMessage = languages_1.languages.getText(req.headers['x-language'], textMessage); // req.get('Accept-Language')
            const result = {};
            result.status = status;
            if (respMessage !== '') {
                result.message = respMessage;
            }
            if (Object.keys(data).length >= 0) {
                result['data'] = data;
                if (status === 200) {
                    if (req.query.page) {
                        result.data.page = req.query.page;
                    }
                    if (req.query.size) {
                        result.data.size = req.query.size;
                    }
                }
            }
            else {
                result['data'] = { result: [] };
            }
            if (req.method === 'GET') {
                const logData = process.env.IS_LOG_DEBUG ? result : '';
                log.info({ 'APIResponse -> send': logData });
            }
            else {
                log.info({
                    jsonObject: data,
                    description: 'APIResponse -> send'
                });
            }
            exports.response.sendResponse(req, res, 200, JSON.stringify(result));
        });
    }
    /**
     * Send error response
     * @param  {RequestData} req
     * @param  {Response} res
     * @param  {any} err
     * @param  {string} defaultMessage
     */
    error(req, res, err, defaultMessage = '', status = 400) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            let respMessage;
            let error;
            // let status: number = 400;
            try {
                error = JSON.parse(err.message);
                status = error.code;
                respMessage = languages_1.languages.getText(req.headers['x-language'], error.msg);
                result = {
                    status,
                    message: respMessage
                };
            }
            catch (r) {
                error = err;
                respMessage = languages_1.languages.getText(req.headers['x-language'], defaultMessage);
                result = {
                    status,
                    message: respMessage
                };
            }
            // const config: ServerConfiguration = configIndex.getServerConfig();
            const errStack = (err || '').stack || '';
            log.error({
                jsonObject: err,
                description: errStack || 'APIResponse -> error'
            });
            // if (config.is_develop || status === 426) {
            //     result.data = error;
            // }
            exports.response.sendResponse(req, res, status, JSON.stringify(result));
        });
    }
    /**
     * Send success or error response, apply gzip compression based on the request
     * @param  {RequestData} req
     * @param  {Response} res
     * @param  {number} statusCode
     * @param  {any} data
     */
    sendResponse(req, res, statusCode, data) {
        const deviceType = req.headers['x-device-type'];
        let allowOrigin = '*';
        if (deviceType)
            allowOrigin = (deviceType.toUpperCase() === 'WEB' && req.headers['origin']) ? req.headers['origin'] : '*';
        // If the user requests with encoding type as gzip send the response to him in that way
        if (req.get('Accept-Encoding') !== undefined &&
            req.get('Accept-Encoding') === 'gzip') {
            zlib.gzip(data, (error, result) => {
                if (error)
                    throw error;
                res.setHeader('Access-Control-Allow-Origin', allowOrigin);
                res.setHeader('Content-Encoding', 'gzip');
                res.status(statusCode).end(result.toString('base64'));
            });
        }
        else {
            res.setHeader('Access-Control-Allow-Origin', allowOrigin);
            res.setHeader('Content-Type', 'application/json');
            //  res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(statusCode).end(data);
        }
    }
    /**
     * Forms the error object understandable to the error handler
     * @param  {} message
     * @param  {} errorCode
     * @param  {} validationData
     */
    buildError(message, errorCode = 400, validationData = '') {
        return new Error(JSON.stringify({
            code: errorCode,
            msg: message,
            validation: validationData
        }));
    }
    serverError(req, res, err, defaultMessage = '') {
        let result;
        let respMessage;
        let error;
        let status = 500;
        try {
            error = JSON.parse(err.message);
            status = error.code;
            respMessage = languages_1.languages.getText(req.get('Accept-Language'), error.msg);
            result = {
                status,
                message: respMessage
            };
        }
        catch (r) {
            error = err;
            respMessage = languages_1.languages.getText(req.get('Accept-Language'), defaultMessage);
            result = {
                status,
                message: respMessage
            };
        }
        // const config: ServerConfiguration = configIndex.getServerConfig();
        // if (config.is_develop) {
        //     result.data = error;
        // }
        console.debug(err);
        // result['status'] = status;
        exports.response.sendResponse(req, res, status, JSON.stringify(result));
    }
    myerror(req, res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            result.status = 900;
            result['data'] = data;
            return exports.response.sendResponse(req, res, 900, JSON.stringify(result));
        });
    }
}
exports.response = new APIResponse();
