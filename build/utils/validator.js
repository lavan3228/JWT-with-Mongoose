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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const Joi = __importStar(require("@hapi/joi"));
const response_1 = require("../utils/response");
const joi_1 = require("joi");
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
(0, joi_password_complexity_1.default)().default;
// const log = commonComponent.common.loggerFactory.getLogger('validator');
class ValidatorUtil {
    constructor() {
        /**
         * signup details validation
         * @param req
         * @param res
         * @param next
         */
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("eejj", req.body);
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                console.log(payload, "djhdff");
                const schema = Joi.object().keys({
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required(),
                    email: Joi.string().email().required().label("Email"),
                    password: Joi.string().required(),
                    mobileNumber: Joi.string().required()
                }).unknown();
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                console.log(err, "************");
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        /**
         * signin details validation
         * @param req
         * @param res
         * @param next
         */
        this.signin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nddjd");
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                const schema = Joi.object().keys({
                    email: Joi.string().email().required().label("Email"),
                    password: Joi.string().required().label("Password"),
                });
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        /**
         * category details validation
         * @param req
         * @param res
         * @param next
         */
        this.category = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nddjd");
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                const schema = Joi.object().keys({
                    name: Joi.string().required()
                });
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        /**
         * order details validation
         * @param req
         * @param res
         * @param next
         * @returns
         */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nddjd");
                if (!req.body || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const productCartSchema = Joi.object().keys({
                    _id: Joi.string().required(),
                    name: Joi.string().required(),
                    count: Joi.number().required(),
                    price: Joi.number().required()
                });
                const payload = req.body.attributes;
                const schema = Joi.object().keys({
                    products: Joi.array().items(productCartSchema),
                    transaction_id: Joi.string().required(),
                    amount: Joi.number().required(),
                    address: Joi.string().required(),
                    user: Joi.string().required(),
                    status: Joi.string().optional()
                });
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        this.product = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nddjd");
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                const schema = Joi.object().keys({
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    price: Joi.number().required(),
                    category: Joi.string().required(),
                    stock: Joi.number().required(),
                    sold: Joi.number().optional(),
                    photo: (0, joi_1.object)()
                });
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        this.refreshTokenBodyValidation = (req, res, next) => {
            try {
                if (!req.body || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body;
                console.log(payload, "jfdjd");
                const schema = Joi.object({
                    refreshToken: Joi.string().required().trim().label("Refresh Token"),
                });
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        };
    }
}
exports.validator = new ValidatorUtil();
