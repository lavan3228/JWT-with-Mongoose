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
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
const userService_1 = require("../service/userService");
const orderService_1 = require("../service/orderService");
const response_1 = require("../utils/response");
// User Profile:
// API Name: /api/users/:userId/profile
// Method Names:
// getUserProfile: GET endpoint to fetch the user's profile.
// updateUserProfile: PUT endpoint to update the user's profile.
const app = (0, express_1.default)();
app.use(express_1.default.json());
class UserController {
    constructor() {
        // 1. get all Users
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("all users start", req.body.username);
                const allUsers = yield orderService_1.orderService.find({});
                if (!allUsers || allUsers.length <= 0) {
                    return response_1.response.error(req, res, {}, "USER DETAILS NOT FOUND");
                }
                // const count = await userService.countAll();
                return response_1.response.send(req, res, allUsers, "USER DETAILS FOUND");
            }
            catch (error) {
                return response_1.response.error(req, res, {}, "SOMETHING WENT WRONG");
            }
        });
        // 2.get single author 
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get user profile start", req.user_id);
                const id = req.user_id;
                const getUser = yield userService_1.userService.find({ _id: id });
                if (!getUser) {
                    return response_1.response.error(req, res, {}, "User not found");
                }
                return response_1.response.send(req, res, getUser, "SUCCESS");
            }
            catch (err) {
                return response_1.response.error(req, res, {}, "SOMETHING WENT WRONG");
            }
        });
        // update user details
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user_id;
                const getUser = yield userService_1.userService.find({ _id: id });
                // const exist = await userModel.findById(req.user.id);
                if (!getUser) {
                    return response_1.response.error(req, res, {}, "User not found");
                }
                return response_1.response.send(req, res, getUser, "Success");
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        // update user details
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const getUser = yield userService_1.userService.find({ _id: id });
                if (!getUser) {
                    return response_1.response.error(req, res, {}, "User not found");
                }
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
    }
}
exports.userController = new UserController();
