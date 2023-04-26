"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const md5 = require('md5');
// const jwt = require('jwt-simple');
// import { env } from '../utils/envToString';
const response_1 = require("../utils/response");
// import { RequestData } from '../interfaces/requestInterface';
// import {validateEnum} from '../utils/enumValues';
// import * as jwt from 'jsonwebtoken';
// import { appVersionService } from '../service/appVersionService';
// import { commonService } from '../service/commonService';
// import { redisService } from '../service/redisService';
// import { constants } from '../utils/constants';
// import { qmsController } from '../controllers/qmsController';
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('Middleware');
class Middleware {
    /**
     * Route not allowed
     * @param  {} req
     * @param  {} res
     */
    methodNotAllowed(req, res) {
        return response_1.response.error(req, res, response_1.response.buildError('METHOD-NOT-ALLOWED', 405));
    }
    /**
     * Page not found
     * @param  {} req
     * @param  {} res
     */
    pageNotFound(req, res) {
        return response_1.response.error(req, res, response_1.response.buildError('PAGE-NOT-FOUND', 404));
    }
}
;
exports.middleware = new Middleware();
