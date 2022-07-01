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
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const joiValidation_1 = __importDefault(require("../joiValidation"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
class userApiCalls {
    constructor() {
        // 1. get all users
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield userModel_1.default.find();
                res.send({
                    status: 200,
                    message: "Success",
                    data: records
                });
            }
            catch (error) {
                res.send({
                    status: 500,
                    message: error.message
                });
            }
        });
        // 2.get single user 
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const getUser = yield userModel_1.default.findById({ _id });
                res.send({
                    status: 200,
                    message: "Success",
                    data: getUser
                });
            }
            catch (err) {
                res.send({
                    status: 404,
                    message: "User not existed"
                });
            }
        });
        // 3.create user
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, mobileNumber, mail, password } = yield joiValidation_1.default.createUserValidation.validateAsync(req.body);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const postuser = yield userModel_1.default.create({
                    username: username,
                    mobileNumber: mobileNumber,
                    mail: mail,
                    password: hashedPassword
                });
                const data = yield postuser.save();
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
        // 4. login user
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const dbUser = yield userModel_1.default.findOne({ where: { username: username } });
                if (dbUser === undefined) {
                    res.send({
                        status: 400,
                        message: "Invalid User"
                    });
                }
                else {
                    const isPasswordMatched = yield bcrypt_1.default.compare(password, dbUser.password);
                    if (isPasswordMatched === true) {
                        const payload = { username: username };
                        const jwtToken = jsonwebtoken_1.default.sign(payload, "djsdbsbcnxnhbwdhj");
                        res.send({ jwtToken });
                    }
                    else {
                        res.send({
                            status: 400,
                            message: "Incorrect Password"
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
                res.send({
                    status: 400,
                    message: err.message
                });
            }
        });
        // 5. update user
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const result = yield joiValidation_1.default.updateUserValidation.validateAsync(req.body);
                const getUser = yield userModel_1.default.findByIdAndUpdate(_id, result, {
                    new: true
                });
                res.send({
                    status: 200,
                    message: "Success",
                    data: getUser
                });
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        // 6. dalete user
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield userModel_1.default.findByIdAndDelete(req.params.id);
                res.send({
                    status: 200,
                    message: "Success",
                    data: deleteUser
                });
            }
            catch (err) {
                res.send(err).status(500);
            }
        });
        //     getUserByName = async (req:Request, res:Response) =>{
        //         try {
        //             const _id = req.params.name;
        //             const getUser = await User.findOne({name:_id})
        //             if (getUser === null) {
        //                 res.send({
        //                     status: 400,
        //                     message: "Name not existed"
        //                 })
        //             }else {
        //                 res.send({
        //                     status: 200,
        //                     message:"Success",
        //                     data: getUser
        //                     })
        //             }
        //         }catch(err){
        //             res.send({
        //                 status: 400,
        //                 message:"User not existed"
        //             })
        //             }
        //         }   
        //     getUserByNumber = async (req:Request, res:Response) =>{
        //         try {
        //             const _id = req.params.number;
        //             const getUser = await User.findOne({number:_id})
        //             if (getUser === null) {
        //                 res.send({
        //                     status: 400,
        //                     message: "Number not existed"
        //                 })
        //             }else {
        //                 res.send({
        //                     status: 200,
        //                     message:"Success",
        //                     data: getUser
        //                     })
        //             }
        //         }catch(err){
        //             res.send({
        //                 status: 400,
        //                 message:"User not existed"
        //             })
        //             }
        //         }
        //     getUserByMail = async (req:Request, res:Response) =>{
        //         try {
        //             const _id = req.params.mail;
        //             const getUser = await User.findOne({mail:_id})
        //             if (getUser === null) {
        //                 res.send({
        //                     status: 400,
        //                     message: "MAIL not existed"
        //                 })
        //             }else {
        //                 res.send({
        //                     status: 200,
        //                     message:"Success",
        //                     data: getUser
        //                     })
        //             }
        //         }catch(err){
        //             res.send({
        //                 status: 400,
        //                 message:"User not existed"
        //             })
        //             }
        //         } 
        //     allUsersWithTech = async (req:Request, res:Response) => {
        //         try{
        //             const records = await User.find({}).populate("technologyId");
        //             res.send({
        //                 status:200,
        //                 message:"Success",
        //                 data: records
        //             })
        //         }catch(error:any){
        //             res.send({
        //                 status:400,
        //                 message: error.message
        //             })
        //         }
        //     } 
        //     getUserWithTech = async (req:Request, res:Response) => {
        //         try{
        //             const result = req.params.id
        //             const records = await User.findOne({_id:result}).populate("technologyId");
        //             res.send({
        //                 status:200,
        //                 message:"Success",
        //                 data: records
        //             })
        //         }catch(error:any){
        //             res.send({
        //                 status:400,
        //                 message: error.message
        //             })
        //         }
        //     }    
    }
}
module.exports = new userApiCalls;
