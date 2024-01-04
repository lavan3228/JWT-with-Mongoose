import { Response, NextFunction } from 'express';
const md5 = require('md5');
// const jwt = require('jwt-simple');
// import { env } from '../utils/envToString';
import { response } from '../utils/response';
// import { RequestData } from '../interfaces/requestInterface';
// import {validateEnum} from '../utils/enumValues';
// import * as jwt from 'jsonwebtoken';
// import { appVersionService } from '../service/appVersionService';
// import { commonService } from '../service/commonService';
// import { redisService } from '../service/redisService';
// import { constants } from '../utils/constants';
// import { qmsController } from '../controllers/qmsController';
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('Middleware');


class Middleware {

    /** 
     * Build error
     * @param  {} error
     */
    buildError(error: any) {
        return response.buildError('REQUIRED-FIELDS-ARE-MISSING', 400, error);
    }

    /**
     * Route not allowed
     * @param  {} req
     * @param  {} res
     */
    methodNotAllowed(req: any, res: any) {
        return response.error(req, res, response.buildError('METHOD-NOT-ALLOWED', 405));
    }

    /**
     * Page not found
     * @param  {} req
     * @param  {} res
     */
    pageNotFound(req: any, res: any) {
        return response.error(req, res, response.buildError('PAGE-NOT-FOUND', 404));
    }

};

export const middleware = new Middleware();
