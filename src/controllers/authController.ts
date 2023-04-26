import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
// import express, { Application } from "express";
// import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
// import { any } from "joi";
import { response } from '../utils/response';
// import { userModel } from '../models/user';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { randomstring } from 'randomstring';
import { userService } from '../service/userService';
import { AnyObject } from 'mongoose';

class AuthController {

    /**
     * save user details
     * @param req 
     * @param res 
     * @returns 
     */
    signup = async (req, res) => {
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
            }

            saveUserData["age"] = 21;

            // saving user details here
            const saveUserDatils = await userService.save(saveUserData);
            log.info({ jsonObject: saveUserDatils, description: "Save User data" });

            if (!saveUserDatils) {
                return response.error(req, res, {}, "NOT able to save user in DB")
            }

            return response.send(req, res, {}, "Success")
        } catch (err: any) {
            console.log(err, "*******")
            return response.error(req, res, {}, 'Something went wrong')
        }
    }


    /**
     * sign in user
     * @param req 
     * @param res 
     * @returns 
     */
    signin = async (req, res) => {
        log.info("sign in method start")
        try {
            const payload = req.body.attributes;

            const userCondition = {
                email: payload.email,
                password: payload.password
            }

            const getUserDetails: AnyObject = await userService.find(userCondition);
            log.info({ jsonObject: getUserDetails, description: "get User data" });

            if (!getUserDetails) {
                return response.error(req, res, {}, "NO DATA Found")
            }

            //create token 
            const token = jwt.sign({ _id: getUserDetails._id }, process.env.SECRET);
            // put token in cookie 
            res.cookie('token', token, { expires: new Date(Date.now() + 9999) })

            // send response to front end 
            const { _id, name, email, role } = getUserDetails;
            return response.send(req, res,  {token, user: { _id, name, email, role }}, "Success")

        } catch (err: any) {
            console.log(err, "**********")
            return response.error(req, res, {}, 'Something went wrong')
        }

    }

    isAuthenticated = (req, res, next) => {
        let checker = (req.profile && req.auth && req.profile_id == req.auth._id);
        if (!checker) {
            return response.error(req, res, {}, "Failed")
        }
        next()
    }

    isAdmin = (req, res, next) => {
        if (req.profile.role === 0) {
            return response.error(req, res, {}, "Failed")
        }
        next()
    }
}

export const authController = new AuthController();
