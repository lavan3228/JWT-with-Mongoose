import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
// import express, { Application } from "express";
// import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
// import { any } from "joi";
// import { userModel } from '../models/user';
import { response } from '../utils/response';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomstring } from 'randomstring';
import { userService } from '../service/userService';
import generateTokens from "../utils/generateToken";
import VerifyRefreshToken from "../utils/verifyRefreshToken";
import UserToken from '../models/userToken';


class AuthController {

    /**
     * save user details
     * @param req 
     * @param res 
     * @returns 
     */
    registerUser = async (req, res) => {
        try {
            const payload = req.body.attributes;
            console.log(payload.email, 'payload');

            const condition = { email: payload.email };

            const userexists = await userService.find(condition);

            console.log(userexists, "jdhfh");
            if (userexists) {
                return res.status(400).send({
                    message: 'User with given email already exist',
                });
            }

            const salt = await bcrypt.genSalt(Number(process.env.SALT));

            // Encrypt password
            const hashedPassword = await bcrypt.hash(payload.password, salt);

            console.log(hashedPassword, "fff")
            const saveUserData = {
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                password: hashedPassword,
                mobileNumber: payload.mobileNumber,
                saltKey: salt
            }

            // saveUserData["age"] = 21;

            // saving user details here
            const newUser = await userService.save(saveUserData);
            log.info({ jsonObject: newUser, description: "Save User data" });

            if (!newUser) {
                return response.error(req, res, {}, "NOT able to save user in DB")
            }

            return response.send(req, res, {}, "Account created sucessfully")
        } catch (err: any) {
            console.log(err, "*******")
            return response.error(req, res, {}, 'Internal Server Error')
        }
    }


    /**
     * sign in user
     * @param req 
     * @param res 
     * @returns 
     */
    loginUser = async (req, res) => {
        log.info("sign in method start")
        try {
            const payload = req.body.attributes;
            console.log(payload, "sai payload")
            const userCondition = {
                email: payload.email
            }

            // const hashedPassword = await bcrypt.compare(payload.password, 10);

            const user: any = await userService.find(userCondition);
            log.info({ jsonObject: user, description: "get User data" });

            if (!user) {
                console.log("sai jdjdj")
                return response.error(req, res, {}, "User does not exist");
            }

            const checkAPassword = await bcrypt.compare(payload.password, user.password);

            console.log(checkAPassword, "chack")
            if (!checkAPassword) {
                return response.error(req, res, {}, "Invalid credentials")
            }

            const { accessToken, refreshToken } = await generateTokens(user);

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
            return response.send(req, res, { accessToken, refreshToken, user: { _id, name, email, role } }, "Logged in sucessfully")

        } catch (err: any) {
            console.log(err, "**********")
            return response.error(req, res, {}, 'Internal Server Error')
        }

    }

    isSignedin = (req, res, next) => {
        // Check if user is signed in
        if (req.session && req.session.userId) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized. Please sign in.' });
        }
    };

    isAuthenticated = (req, res, next) => {
        let checker = (req.profile && req.auth && req.profile_id == req.auth._id);
        if (!checker) {
            return response.error(req, res, {}, "Failed")
        }
        next()

        // if (req.user) {
        //     // User is authenticated, allow access to the route
        //     next();
        //   } else {
        //     // User is not authenticated, respond with an error or redirect to login page
        //     res.status(401).json({ error: 'Unauthorized. Please log in.' });
        //   }
    }

    isAdmin = (req, res, next) => {
        if (req.profile.role === 0) {
            return response.error(req, res, { code: 403 }, "Failed")
        }
        next()

        // if (req.user && req.user.role === 'admin') {
        //     // User is an admin, allow access to the route
        //     next();
        //   } else {
        //     // User is not an admin, respond with an error or redirect
    }

    // get new access token
    verifyRefreshToken = async (req, res) => {
        const payload = req.body;
        console.log("verify refresh token start")
        const tokenDetails: any = await VerifyRefreshToken(payload.refreshToken);
        console.log(tokenDetails, "hdhdf")
        if (tokenDetails.error === false) {
            const payload = { _id: tokenDetails.payload._id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                process.env.REFRESH_TOKEN_PRIVATE_KEY,
                { expiresIn: "14m" }
            );
            return res.status(200).json({
                status: true,
                accessToken,
                message: "Access token created successfully",
            });
        }
        return res.status(400).json(tokenDetails.message);
    }


    // logout
    logoutUser = async (req, res) => {
        log.info("sign out method start")
        try {
            const userToken = await UserToken.findOne({ token: req.body.refreshToken });
            if (!userToken) {
                console.log("dndd")
                return res
                    .status(200)
                    .json({ status: true, message: "Logged Out Sucessfully" });
            }
            console.log("djjd")
            await userToken.remove();
            res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }

    }
}

export const authController = new AuthController();
