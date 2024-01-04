import * as Joi from '@hapi/joi';
import { response } from '../utils/response';
import * as _ from "lodash";
import { object } from 'joi';
// import passwordComplexity from "joi-password-complexity";
// passwordComplexity().default;
// const log = commonComponent.common.loggerFactory.getLogger('validator');

// string(), number(), alphanum(), required(), min()/max(), email(), date(), greater(), optional,
//    pattern(): Joi.length(10).pattern(/[6–9]{1}[0–9]{9}/) , regex: Joi.string().pattern(new RegExp(“^[a-zA-Z0–9@]{3,30}$”))

class ValidatorUtil {
    /**
     * signup details validation
     * @param req 
     * @param res 
     * @param next 
     */
    signup = async (req, res, next) => {
        try {
            console.log("dgedh677");
            
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }
            const payload = req.body.attributes;
            console.log(payload, "djhdff")
            const schema = Joi.object().keys({
                firstname: Joi.string().required(),
                // middleName: Joi.string().optional(),
                lastname: Joi.string().required(),
                // userName: Joi.string().alphanum().min(3).max(30).required(),
                email: Joi.string().email().required().label("Email"),
                password: Joi.string().required(), // Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
                // confirmPassword: Joi.ref("password"),
                // age: Joi.number().required().min(0).max(100),
                // DOB: Joi.date().greater(new Date("1940-01-01")).required(),
                mobileNumber: Joi.string().required() // Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
            }).unknown();

            const { error }: any = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                console.log("nddj4", error.details[0].message);
                
                return response.error(req, res, error.details, 'REQUIRED-FIELDS-ARE-MISSING');
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
            console.log(payload, "payload");
            
            const schema = Joi.object().keys({
                email: Joi.string().email().trim().required().label("Email"),
                password: Joi.string().trim().required().label("Password"),
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
            console.log(err, "*****")
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
    createOrder = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }

            const productCartSchema: any = Joi.object().keys({
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
                status: Joi.string().optional()
            });

            // address: {
            //     addressLine: Joi.string().max(50).required(),
            //     state: Joi.string().max(15).required(),
            //     country: Joi.string().max(20).required(),
            //     pinCode: Joi.string().max(7).required(),
            //   },

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
            const pay: any = req.body;
            console.log(pay, "djdj")
            if (!req.body || Object.keys(req.body).length === 0) {
                console.log("dddk")
                return response.error(req, res, {}, "INVALID-REQUEST")
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
            } else {
                console.log("hddhjd", error)
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            console.log(err, "********")
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    /**
     * cart items validation
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    addCart = async (req, res, next) => {
        try {
            // console.log("nddjd",req.body.attributes )
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
            }

            const payload = req.body.attributes;

            const itemSchema = Joi.object().keys({
                productId: Joi.string().required(),
                imageUrl: Joi.string().required(),
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

            console.log(payload, "dkd")

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            console.log(err, "*****")
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    addWichList = async (req, res, next) => {
        try {
            // console.log("nddjd",req.body.attributes )
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
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

            console.log(payload, "dkd")

            const { error } = schema.validate(payload);
            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, error.details[0].message, 'REQUIRED-FIELDS-ARE-MISSING');
            }
        } catch (err) {
            console.log(err, "*****")
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    removeCart = async (req, res, next) => {
        try {
            console.log("nddjd")
            if (!req.body || !req.body.attributes || Object.keys(req.body).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST")
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

    /**
     * cart checkout validation
     * @param req 
     * @param res 
     * @param next 
     */
    checkout = async (req, res, next) => {
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
            console.log(err, "*****")
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }

    orderHistory = (req, res, next) => {
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
                } else {
                    return response.error(req, res, {}, error.details[0].message);
                }
            } else {
                return response.error(req, res, { message: 'PAYLOAD-MISSING' }, 'INVALID-REQUEST');
            }
        } catch (err) {
            response.error(req, res, { message: 'SOME-THING-WENT-WRONG' }, 'SOME-THING-WENT-WRONG');
        }
    }

    cancelOrder = (req, res, next) => {
        try {
            if ((Object.keys(req.body).length > 0) && (Object.keys(req.body.attributes).length > 0)) {    
                
                const schema = Joi.object().keys({
                    order_id: Joi.string().required(),
                    reason: Joi.string().required(),
                    // phone_number: otpValidateField.min(10).max(10).regex(/^[0-9]*$/).trim(),
                });

                const { error } = schema.validate(req.body.attributes);
                (error === null || error === undefined) ? next() : response.error(req, res, {}, error.details[0].message);
            } else {
                response.error(req, res, { message: 'PAYLOAD-MISSING' }, 'INVALID-REQUEST');
            }
        } catch (err) {
            response.error(req, res, err, 'SOME-THING-WENT-WRONG');
        }
    }


    // important vlaidation

    repostingJobsValidator = (req, res, next) => {
        try {
            if (_.isEmpty(req) || _.isEmpty(req.body) ||
                Object.keys(req.body).length === 0 || _.isEmpty(req.body.attributes) ||
                Object.keys(req.body.attributes).length === 0) {
                return response.error(req, res, {}, "INVALID-REQUEST");
            }
            const schema = Joi.object().keys({
                order_id: Joi.string().required(),
                lab_number: Joi.string().required(),
                retrying_job: Joi.string().required()
            });
            const { error }: any = schema.validate(req.body.attributes);

            if (error === null || error === undefined) {
                next();
            } else {
                return response.error(req, res, {}, error.details[0].message);
            }
        } catch (err) {
            // log.error({
            //     jsonObject: err,
            //     description: 'Validator: repostingJobsValidator catch error'
            // });
            return response.error(req, res, err);
        }
    }


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

export const validator = new ValidatorUtil();
