import * as Joi from '@hapi/joi';
import { response } from '../utils/response';
import * as _ from "lodash";
import { object } from 'joi';
import passwordComplexity from "joi-password-complexity";
passwordComplexity().default;
// const log = commonComponent.common.loggerFactory.getLogger('validator');

class ValidatorUtil {
    /**
     * signup details validation
     * @param req 
     * @param res 
     * @param next 
     */
    signup = async (req, res, next) => {
        try {
            console.log("eejj", req.body)
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }
            const payload = req.body.attributes;
            console.log(payload, "djhdff")
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
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            console.log(err, "************")
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    /**
     * signin details validation
     * @param req 
     * @param res 
     * @param next 
     */
    signin = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }
            const payload = req.body.attributes;
            const schema = Joi.object().keys({
                email: Joi.string().email().required().label("Email"),
                password: Joi.string().required().label("Password"),
            });

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    /**
     * category details validation
     * @param req 
     * @param res 
     * @param next 
     */
    category = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }
            const payload = req.body.attributes;
            const schema = Joi.object().keys({
                name: Joi.string().required()
            });

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    /**
     * order details validation
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    create = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }

            const productCartSchema: any = Joi.object().keys({
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
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    product = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }

            const payload = req.body.attributes;
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
                category: Joi.string().required(),
                stock: Joi.number().required(),
                sold: Joi.number().optional(),
                photo: object()
            });

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    refreshTokenBodyValidation = (req, res, next) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }

            const payload = req.body;
            console.log(payload, "jfdjd")
            const schema = Joi.object({
                refreshToken: Joi.string().required().trim().label("Refresh Token"),
            });

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    cart = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }

            const payload = req.body.attributes;
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
                category: Joi.string().required(),
                stock: Joi.number().required(),
                sold: Joi.number().optional(),
                photo: object()
            });

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }
}

export const validator = new ValidatorUtil();
