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
const user_1 = require("../models/user");
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
const userService_1 = require("../service/userService");
const orderService_1 = require("../service/orderService");
const response_1 = require("../utils/response");
const app = (0, express_1.default)();
app.use(express_1.default.json());
class UserController {
    constructor() {
        // 1. get all Users
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("jejwjeh");
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
                const id = req.params.id;
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
        // 3.create user
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ehrfj");
                const result = req.body;
                const author = yield user_1.userModel.create({
                    name: result.name,
                    lastname: result.lastname,
                    email: result.email,
                    userInfo: result.userInfo,
                    password: result.password,
                    salt: result.salt,
                    role: result.role
                });
                const data = yield author.save();
                res.send({
                    status: 201,
                    message: "Success",
                    data: data
                });
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        // 4. update author
        // updateAuthor = async (req:Request, res:Response)=>{
        //     try{
        //         const _id = req.params.id;
        //         const result = await validation.updateAuthorValidation.validateAsync(req.body);
        //         const getAuthor = await Author.findByIdAndUpdate(_id, result, {
        //             new: true
        //         });
        //         res.send({
        //             status: 200,
        //             message:"Success",
        //             data: getAuthor 
        //         })
        //     }catch(error:any){
        //         res.send({
        //             status: 400,
        //             message: error.message
        //         })
        //     }
        // }
        // // 5. delete author by id
        // deleteAuthor = async (req:Request, res:Response) =>{
        //     try{
        //         const deleteAuthor = await Author.findByIdAndDelete(req.params.id)
        //         if (!deleteAuthor) {
        //             res.send({
        //                 status: 400,
        //                 message: "Author not exists",
        //             })
        //         }
        //         res.send({
        //             status: 200,
        //             message: "Success",
        //             data: deleteAuthor
        //         })
        //     }catch(err:any){
        //         res.send({
        //             status: 400,
        //             message: err.message,
        //         })
        //     }
        // }
    }
}
exports.userController = new UserController();
