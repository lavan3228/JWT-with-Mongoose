import * as zlib from 'zlib';
import { Response } from 'express';
import { languages } from '../languages';
import { RequestData } from '../interfaces/requestInterface';
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('APIResponse');

class APIResponse {

    async send(req: RequestData, res: Response, data: any, textMessage: string = '', status: number = 200) {
        const respMessage: string = languages.getText(req.headers['x-language'], textMessage);  // req.get('Accept-Language')
        const result: any = {};
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
        } else {
            result['data'] = { result: [] };
        }

        if (req.method === 'GET') {
            const logData = process.env.IS_LOG_DEBUG ? result : '';
            log.info({ 'APIResponse -> send': logData });
        } else {
            log.info({
                jsonObject: data,
                description: 'APIResponse -> send'
            });
        }

        response.sendResponse(req, res, 200, JSON.stringify(result));
    }


    /**
     * Send error response
     * @param  {RequestData} req
     * @param  {Response} res
     * @param  {any} err
     * @param  {string} defaultMessage
     */
    async error(req: RequestData, res: Response, err: any, defaultMessage: string = '', status: number = 400) {
        let result: ErrorResult;
        let respMessage: string;
        let error: any;
        // let status: number = 400;

        try {
            console.log(err, "fnfn8");
            
            error = JSON.parse(err.message);
            console.log(error, "ndhd4");
            

            // status = error.code;
            respMessage = languages.getText(req.headers['x-language'], error.msg);

            result = {
                status,
                message: respMessage
            };
        } catch (r) {
            console.log(err, "dhjd8");
            
            error = err;

            respMessage = languages.getText(req.headers['x-language'], defaultMessage);
            result = {
                status,
                message: respMessage
            };
        }

        console.log(result, "jdjd9");
        

        // const config: ServerConfiguration = configIndex.getServerConfig();
        const errStack = (err || '').stack || '';
        log.error({
            jsonObject: err,
            description: errStack || 'APIResponse -> error'
        });

        // if (config.is_develop || status === 426) {
        //     result.data = error;
        // }

        response.sendResponse(req, res, status, JSON.stringify(result));
    }

    /**
     * Send success or error response, apply gzip compression based on the request
     * @param  {RequestData} req
     * @param  {Response} res
     * @param  {number} statusCode
     * @param  {any} data
     */
    sendResponse(req: RequestData, res: Response, statusCode: number, data: any) {
        const deviceType: any = req.headers['x-device-type'];
        let allowOrigin: any = '*';

        if (deviceType)
            allowOrigin = (deviceType.toUpperCase() === 'WEB' && req.headers['origin']) ? req.headers['origin'] : '*';

        // If the user requests with encoding type as gzip send the response to him in that way
        if (req.get('Accept-Encoding') !== undefined &&
            req.get('Accept-Encoding') === 'gzip') {
            zlib.gzip(data, (error, result) => {
                if (error) throw error;
                res.setHeader('Access-Control-Allow-Origin', allowOrigin);
                res.setHeader('Content-Encoding', 'gzip');
                res.status(statusCode).end(result.toString('base64'));
            });
        } else {
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
    buildError(message: string, errorCode: number = 400, validationData: string = '') {
        return new Error(JSON.stringify({
            code: errorCode,
            msg: message,
            validation: validationData
        }));
    }

    serverError(req: RequestData, res: Response, err: any, defaultMessage: string = '') {
        let result: ErrorResult;
        let respMessage: string;
        let error: any;
        let status: number = 500;

        try {
            error = JSON.parse(err.message);

            status = error.code;
            respMessage = languages.getText(req.get('Accept-Language'), error.msg);

            result = {
                status,
                message: respMessage
            };
        } catch (r) {
            error = err;

            respMessage = languages.getText(req.get('Accept-Language'), defaultMessage);
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

        response.sendResponse(req, res, status, JSON.stringify(result));
    }

    async myerror(req, res, data: any) {
        const result: any = {};
        result.status = 900;
        result['data'] = data;
        return response.sendResponse(req, res, 900, JSON.stringify(result));
    }

}

interface ErrorResult {
    message: string;
    data?: object;
    status: number;
}

export const response = new APIResponse();
