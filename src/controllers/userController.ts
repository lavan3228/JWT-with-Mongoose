import express, { Application } from "express";
import { userModel } from "../models/user";
import validation from "../joiValidation";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import { userService } from "../service/userService";
import { Index } from "../service";
import { orderService } from '../service/orderService';
import { response } from '../utils/response';


// User Profile:

// API Name: /api/users/:userId/profile
// Method Names:
// getUserProfile: GET endpoint to fetch the user's profile.
// updateUserProfile: PUT endpoint to update the user's profile.

const app: Application = express();
app.use(express.json());

class UserController {

    // 1. get all Users
    allUsers = async (req, res) => {
        try {
            console.log("all users start", req.body.username)
            const allUsers: any = await orderService.find({});

            if (!allUsers || allUsers.length <= 0) {
                return response.error(req, res, {}, "USER DETAILS NOT FOUND");
            }

            // const count = await userService.countAll();
            return response.send(req, res, allUsers, "USER DETAILS FOUND");
        } catch (error: any) {
            return response.error(req, res, {}, "SOMETHING WENT WRONG")
        }
    }

    // 2.get single author 
    getUser = async (req, res) => {
        try {
            console.log("get user profile start", req.user_id);

            const id = req.user_id;
            const getUser = await userService.find({ _id: id });

            if (!getUser) {
                return response.error(req, res, {}, "User not found")
            }

            return response.send(req, res, getUser, "SUCCESS")
        } catch (err) {
            return response.error(req, res, {}, "SOMETHING WENT WRONG")
        }
    }

    // update user details
    updateUser = async (req, res) => {
        try {
            
            const id = req.user_id;
            const getUser = await userService.find({ _id: id });
            // const exist = await userModel.findById(req.user.id);

            if (!getUser) {
                return response.error(req, res, {}, "User not found")
            }

            return response.send(req, res, getUser, "Success")

        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            })
        }
    }

    // update user details
    deleteUser = async (req, res) => {
        try {
            const user_id = req.user_id;
            const getUser = await userService.find({ _id: user_id });

            if (!getUser) {
                return response.error(req, res, {}, "User not found")
            }

        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            })
        }
    }

}


export const userController = new UserController();
