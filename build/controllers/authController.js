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
// import { userModel } from '../models/user';
const response_1 = require("../utils/response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("../service/userService");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const verifyRefreshToken_1 = __importDefault(require("../utils/verifyRefreshToken"));
const chalk_1 = __importDefault(require("chalk"));
// const chalk = require('chalk');
class AuthController {
    constructor() {
        /**
         * save user details
         * @param req
         * @param res
         * @returns
         */
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                console.log(payload.email, 'payload');
                const condition = { email: payload.email };
                const userexist = yield userService_1.userService.find(condition);
                console.log(userexist, "jdhfh");
                if (userexist) {
                    return res.status(400).send({
                        message: 'User with given email already exist',
                    });
                }
                // if(payload.password !== payload.confirmpassword) {
                //     return response.send(req, res, {}, "Passwords are not matching");
                // }
                const salt = yield bcrypt_1.default.genSalt(Number(process.env.SALT));
                // Encrypt password
                const hashedPassword = yield bcrypt_1.default.hash(payload.password, salt);
                console.log(hashedPassword, "fff");
                const saveUserData = {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                    password: hashedPassword,
                    mobileNumber: payload.mobileNumber,
                    saltKey: salt
                };
                // saveUserData["age"] = 21;
                // saving user details here
                const newUser = yield userService_1.userService.save(saveUserData);
                log.info({ jsonObject: newUser, description: "Save User data" });
                if (!newUser) {
                    return response_1.response.error(req, res, {}, "NOT able to save user in DB");
                }
                return response_1.response.send(req, res, {}, "Registered Sucessfully");
            }
            catch (err) {
                console.log(err, "*******");
                return response_1.response.error(req, res, {}, 'Registered Internal Server Error');
            }
        });
        /**
         * sign in user
         * @param req
         * @param res
         * @returns
         */
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            log.info("sign in method start");
            try {
                console.log(chalk_1.default.blue("login started!"));
                const payload = req.body.attributes;
                log.info({ jsonObject: payload, description: "123 User data" });
                log.error({ jsonObject: payload, description: "456 User data" });
                console.log(payload, "sai payload");
                log.info("sign in method start");
                const userCondition = {
                    email: payload.email
                };
                // const hashedPassword = await bcrypt.compare(payload.password, 10);
                const user = yield userService_1.userService.find(userCondition);
                log.info({ jsonObject: user, description: "get User data" });
                if (!user) {
                    console.log("sai jdjdj");
                    return response_1.response.error(req, res, {}, "User Not Found");
                }
                const checkAPassword = yield bcrypt_1.default.compare(payload.password, user.password);
                console.log(checkAPassword, "chack");
                if (!checkAPassword) {
                    log.error("jjdj");
                    log.error({ jsonObject: {}, description: "error invalid credentials" });
                    return response_1.response.error(req, res, {}, "Invalid credentials");
                }
                const { accessToken, refreshToken } = yield (0, generateToken_1.default)(user);
                // //create token 
                // const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
                // // put token in cookie 
                // res.cookie('token', accessToken, { expires: new Date(Date.now() + 1000 * 600) })
                // //create refreshToken token 
                // const refreshToken = jwt.sign({ _id: user._id } + Date.now().toString(), process.env.REFRESH_TOKEN_SECRET);
                // // put refreshToken in cookie 
                // res.cookie('token', refreshToken, { expires: new Date(Date.now() + 999999) })
                // res.cookie('jwt', newRefreshToken, {
                //     httpOnly: true, 
                //     secure: true,
                //     sameSite: 'Strict',  // or 'Lax', it depends
                //     maxAge: 604800000,  // 7 days
                // });
                // send response to front end 
                const { _id, name, email, role } = user;
                return response_1.response.send(req, res, { accessToken, refreshToken, user: { _id, name, email, role } }, "Logged in sucessfully");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, {}, 'Internal Server Error');
            }
        });
        this.isSignedin = (req, res, next) => {
            // Check if user is signed in
            if (req.session && req.session.userId) {
                next();
            }
            else {
                res.status(401).json({ error: 'Unauthorized. Please sign in.' });
            }
        };
        this.isAuthenticated = (req, res, next) => {
            let checker = (req.profile && req.auth && req.profile_id == req.auth._id);
            if (!checker) {
                return response_1.response.error(req, res, {}, "Failed");
            }
            next();
            // if (req.user) {
            //     // User is authenticated, allow access to the route
            //     next();
            //   } else {
            //     // User is not authenticated, respond with an error or redirect to login page
            //     res.status(401).json({ error: 'Unauthorized. Please log in.' });
            //   }
        };
        this.isAdmin = (req, res, next) => {
            if (req.profile.role === 0) {
                return response_1.response.error(req, res, { code: 403 }, "Failed");
            }
            next();
            // if (req.user && req.user.role === 'admin') {
            //     // User is an admin, allow access to the route
            //     next();
            //   } else {
            //     // User is not an admin, respond with an error or redirect
        };
        // get new access token
        this.verifyRefreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            console.log("verify refresh token start");
            const tokenDetails = yield (0, verifyRefreshToken_1.default)(payload.refreshToken);
            console.log(tokenDetails, "hdhdf");
            if (tokenDetails.error === false) {
                const payload = { _id: tokenDetails.payload._id, roles: tokenDetails.roles };
                const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "15m" });
                const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "1d" });
                return res.status(200).json({
                    status: true,
                    accessToken, refreshToken,
                    message: "Access token created successfully",
                });
            }
            return res.status(400).json(tokenDetails.message);
        });
        // logout
        this.logoutUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            log.info("sign out method start");
            try {
                const userToken = yield userService_1.userService.find({ token: req.body.refreshToken });
                if (!userToken) {
                    console.log("dndd");
                    return response_1.response.send(req, res, { status: true, message: "Logged Out Sucessfully" }, "Success");
                }
                console.log("djjd");
                yield userService_1.userService.delete({ token: req.body.refreshToken });
                res.status(200).json({ status: true, message: "Logged Out Sucessfully lavan" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: true, message: "Internal Server Error" });
            }
        });
    }
}
exports.authController = new AuthController();
