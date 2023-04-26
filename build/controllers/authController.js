"use strict";
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
exports.authController = void 0;
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
// import express, { Application } from "express";
// import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
// import { any } from "joi";
const response_1 = require("../utils/response");
// import { userModel } from '../models/user';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import bcrypt from 'bcrypt';
// import { randomstring } from 'randomstring';
const userService_1 = require("../service/userService");
class AuthController {
    constructor() {
        /**
         * save user details
         * @param req
         * @param res
         * @returns
         */
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                // const saltKey = randomstring.generate(8);
                // Encrypt password
                // const hashedPassword = await bcrypt.hash(payload.password, saltKey).toString();
                const saveUserData = {
                    name: payload.name,
                    lastname: payload.lastname,
                    email: payload.email,
                    password: payload.password,
                    // saltKey: saltKey
                };
                saveUserData["age"] = 21;
                // saving user details here
                const saveUserDatils = yield userService_1.userService.save(saveUserData);
                log.info({ jsonObject: saveUserDatils, description: "Save User data" });
                if (!saveUserDatils) {
                    return response_1.response.error(req, res, {}, "NOT able to save user in DB");
                }
                return response_1.response.send(req, res, {}, "Success");
            }
            catch (err) {
                console.log(err, "*******");
                return response_1.response.error(req, res, {}, 'Something went wrong');
            }
        });
        /**
         * sign in user
         * @param req
         * @param res
         * @returns
         */
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            log.info("sign in method start");
            try {
                const payload = req.body.attributes;
                const userCondition = {
                    email: payload.email,
                    password: payload.password
                };
                const getUserDetails = yield userService_1.userService.find(userCondition);
                log.info({ jsonObject: getUserDetails, description: "get User data" });
                if (!getUserDetails) {
                    return response_1.response.error(req, res, {}, "NO DATA Found");
                }
                //create token 
                const token = jsonwebtoken_1.default.sign({ _id: getUserDetails._id }, process.env.SECRET);
                // put token in cookie 
                res.cookie('token', token, { expires: new Date(Date.now() + 9999) });
                // send response to front end 
                const { _id, name, email, role } = getUserDetails;
                return response_1.response.send(req, res, { token, user: { _id, name, email, role } }, "Success");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, {}, 'Something went wrong');
            }
        });
        this.isAuthenticated = (req, res, next) => {
            let checker = (req.profile && req.auth && req.profile_id == req.auth._id);
            if (!checker) {
                return response_1.response.error(req, res, {}, "Failed");
            }
            next();
        };
        this.isAdmin = (req, res, next) => {
            if (req.profile.role === 0) {
                return response_1.response.error(req, res, {}, "Failed");
            }
            next();
        };
    }
}
exports.authController = new AuthController();
