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
exports.validator = void 0;
const Joi = __importStar(require("@hapi/joi"));
const response_1 = require("../utils/response");
const _ = __importStar(require("lodash"));
// import passwordComplexity from "joi-password-complexity";
// passwordComplexity().default;
// const log = commonComponent.common.loggerFactory.getLogger('validator');
// string(), number(), alphanum(), required(), min()/max(), email(), date(), greater(), optional,
//    pattern(): Joi.length(10).pattern(/[6–9]{1}[0–9]{9}/) , regex: Joi.string().pattern(new RegExp(“^[a-zA-Z0–9@]{3,30}$”))
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
                    // middleName: Joi.string().optional(),
                    lastname: Joi.string().required(),
                    // userName: Joi.string().alphanum().min(3).max(30).required(),
                    email: Joi.string().email().required().label("Email"),
                    password: Joi.string().required(),
                    // confirmPassword: Joi.ref("password"),
                    // age: Joi.number().required().min(0).max(100),
                    // DOB: Joi.date().greater(new Date("1940-01-01")).required(),
                    mobileNumber: Joi.string().required() // Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
                }).unknown();
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    console.log("nddj4", error.details[0].message);
                    return response_1.response.error(req, res, error.details, 'REQUIRED-FIELDS-ARE-MISSING');
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
                console.log(payload, "payload");
                const schema = Joi.object().keys({
                    email: Joi.string().email().trim().required().label("Email"),
                    password: Joi.string().trim().required().label("Password"),
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
                console.log(err, "*****");
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
        this.createOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nddjd");
                if (!req.body || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const productCartSchema = Joi.object().keys({
                    productId: Joi.string().required(),
                    productName: Joi.string().required(),
                    productQuantity: Joi.number().required(),
                    price: Joi.number().required()
                });
                const payload = req.body;
                const schema = Joi.object().keys({
                    products: Joi.array().items(productCartSchema),
                    transaction_id: Joi.string().required(),
                    totalAmount: Joi.number().required(),
                    address: Joi.string().required(),
                    userId: Joi.string().required(),
                    status: Joi.string().optional()
                });
                // address: {
                //     addressLine: Joi.string().max(50).required(),
                //     state: Joi.string().max(15).required(),
                //     country: Joi.string().max(20).required(),
                //     zipCode: Joi.string().max(7).required(),
                //   },
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
                const pay = req.body;
                console.log(pay, "djdj");
                if (!req.body || Object.keys(req.body).length === 0) {
                    console.log("dddk");
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body;
                const schema = Joi.object().keys({
                    productName: Joi.string().required(),
                    description: Joi.string().required(),
                    price: Joi.number().required(),
                    category: Joi.string().required(),
                    userId: Joi.string().required(),
                    stock: Joi.number().required(),
                    sold: Joi.number().optional(),
                    imageUrl: Joi.string().optional()
                });
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    console.log("hddhjd", error);
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                console.log(err, "********");
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        /**
         * cart items validation
         * @param req
         * @param res
         * @param next
         * @returns
         */
        this.addCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("nddjd",req.body.attributes )
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                const itemSchema = Joi.object().keys({
                    productId: Joi.string().required(),
                    name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    price: Joi.number().required(),
                    // active: Joi.number().integer().valid(0, 1).optional()
                });
                const schema = Joi.object().keys({
                    items: Joi.array().items(itemSchema).min(1).required(),
                    bill: Joi.number().required()
                    // category: Joi.string().required(),
                    // stock: Joi.number().required(),
                    // sold: Joi.number().optional(),
                    // photo: object()
                });
                console.log(payload, "dkd");
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                console.log(err, "*****");
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        this.addWichList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("nddjd",req.body.attributes )
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                const itemSchema = Joi.object().keys({
                    productId: Joi.string().required(),
                    name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    price: Joi.number().required()
                });
                const schema = Joi.object().keys({
                    items: Joi.array().items(itemSchema).min(1).required(),
                    bill: Joi.number().required()
                    // category: Joi.string().required(),
                    // stock: Joi.number().required(),
                    // sold: Joi.number().optional(),
                    // photo: object()
                });
                console.log(payload, "dkd");
                const { error } = schema.validate(payload);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
                }
            }
            catch (err) {
                console.log(err, "*****");
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        this.removeCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nddjd");
                if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const payload = req.body.attributes;
                const itemSchema = Joi.object().keys({
                    productId: Joi.string().required(),
                    name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    price: Joi.number().required()
                });
                const schema = Joi.object().keys({
                    items: Joi.array().items(itemSchema).required(),
                    bill: Joi.number().required(),
                    // category: Joi.string().required(),
                    // stock: Joi.number().required(),
                    // sold: Joi.number().optional(),
                    // photo: object()
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
        /**
         * cart checkout validation
         * @param req
         * @param res
         * @param next
         */
        this.checkout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                console.log(err, "*****");
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        });
        this.orderHistory = (req, res, next) => {
            try {
                if (Object.keys(req.query).length > 0) {
                    const schema = Joi.object().keys({
                        orderId: Joi.string().required(),
                        search: Joi.string(),
                        page: Joi.allow(""),
                        size: Joi.allow("")
                    }).unknown();
                    const { error } = schema.validate(req.query);
                    if (error === null || error === undefined) {
                        next();
                    }
                    else {
                        return response_1.response.error(req, res, {}, error.details[0].message);
                    }
                }
                else {
                    return response_1.response.error(req, res, { message: 'PAYLOAD-MISSING' }, 'INVALID-REQUEST');
                }
            }
            catch (err) {
                response_1.response.error(req, res, { message: 'SOME-THING-WENT-WRONG' }, 'SOME-THING-WENT-WRONG');
            }
        };
        this.cancelOrder = (req, res, next) => {
            try {
                if ((Object.keys(req.body).length > 0) && (Object.keys(req.body.attributes).length > 0)) {
                    const schema = Joi.object().keys({
                        order_id: Joi.string().required(),
                        reason: Joi.string().required(),
                        // phone_number: otpValidateField.min(10).max(10).regex(/^[0-9]*$/).trim(),
                    });
                    const { error } = schema.validate(req.body.attributes);
                    (error === null || error === undefined) ? next() : response_1.response.error(req, res, {}, error.details[0].message);
                }
                else {
                    response_1.response.error(req, res, { message: 'PAYLOAD-MISSING' }, 'INVALID-REQUEST');
                }
            }
            catch (err) {
                response_1.response.error(req, res, err, 'SOME-THING-WENT-WRONG');
            }
        };
        // important vlaidation
        this.repostingJobsValidator = (req, res, next) => {
            try {
                if (_.isEmpty(req) || _.isEmpty(req.body) ||
                    Object.keys(req.body).length === 0 || _.isEmpty(req.body.attributes) ||
                    Object.keys(req.body.attributes).length === 0) {
                    return response_1.response.error(req, res, {}, "INVALID-REQUEST");
                }
                const schema = Joi.object().keys({
                    order_id: Joi.string().required(),
                    lab_number: Joi.string().required(),
                    retrying_job: Joi.string().required()
                });
                const { error } = schema.validate(req.body.attributes);
                if (error === null || error === undefined) {
                    next();
                }
                else {
                    return response_1.response.error(req, res, {}, error.details[0].message);
                }
            }
            catch (err) {
                // log.error({
                //     jsonObject: err,
                //     description: 'Validator: repostingJobsValidator catch error'
                // });
                return response_1.response.error(req, res, err);
            }
        };
        /**
         * Order creation validator
         * @param req
         */
        // orderCreation(req) {
        //     const body = req.body.attributes;
        //     if (body === undefined) {
        //         return this.buildError('NO-BODY');
        //     }
        //     const saveSchema = Joi.object().options({
        //         abortEarly: false
        //     }).keys({
        //         amount: Joi.number().min(1).required(),
        //         order_id: Joi.string().required()
        //     });
        //     let values = {};
        //     if (body !== undefined) {
        //         values = {
        //             amount: body['amount'],
        //             order_id: body['order_id']
        //         };
        //     }
        //     const validateResult = validator.validate(values, saveSchema);
        //     return validateResult.error !== null
        //         ? (validateResult.error.details[0].message) : true;
        // }
        /**
         * this code for controller above validation
         *
         * //     const validatorResult = await validator.refundList(req);
                if (validatorResult !== true) {
                    return response.error(req, res, {}, validatorResult);
                }
        // }
         */
    }
}
exports.validator = new ValidatorUtil();
