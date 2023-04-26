"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.productController = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
const formidable_1 = __importDefault(require("formidable"));
const fs = __importStar(require("fs"));
const productService_1 = require("../service/productService");
const response_1 = require("../utils/response");
const app = (0, express_1.default)();
app.use(express_1.default.json());
class ProductController {
    constructor() {
        // 1. get all users
        // allUsers = async (req:Request, res:Response) =>{
        //     try{
        //         const records = await User.find()
        //         res.send({
        //             status:200,
        //             message:"Success",
        //             data: records
        //         })
        //     }catch(error:any){
        //         res.send({
        //             status:500,
        //             message: error.message
        //         })
        //     }
        // }
        // 2.get single user 
        // getUser = async (req:Request, res:Response) =>{
        //     try{
        //         const _id = req.params.id;
        //         let getUser;
        //             if (_id.endsWith(".com")) {
        //                 getUser = await User.findOne({mail:_id})
        //             } else if (_id.length === 10) {
        //                 getUser = await User.findOne({mobileNumber:_id})
        //             } else if (_id.length === 24 ) {
        //                 getUser = await User.findOne({_id:_id}) 
        //             } else {
        //                 getUser = await User.findOne({username:_id})
        //             }
        //         if (!getUser) {
        //             res.send({
        //                 status: 400,
        //                 message:"user not exists"
        //                 })
        //         } else {
        //             res.send({
        //                 status: 200,
        //                 message:"Success",
        //                 data: getUser
        //                 })
        //         }
        //     }catch(err){
        //         res.send({
        //             status: 404,
        //             message:"User not existed"
        //         })
        //     }
        // }
        /**
         * create product
         * @param req
         * @param res
         */
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let form = new formidable_1.default.IncomingForm();
                // form = formidable({ multiples: true });
                // form.KeepExtensions = true;
                // console.log(form, "erfjbre")
                form.parse(req, (err, filds, file) => __awaiter(this, void 0, void 0, function* () {
                    // console.log(filds, file, "erjkn")
                    if (err) {
                        return response_1.response.error(req, res, {}, 'problem with image');
                    }
                    let product = new product_1.productModel(filds);
                    const { name, description, price, category, stock } = product;
                    if (!name || !description || !price || !category || !stock) {
                        return response_1.response.error(req, res, {}, "please include all fields");
                    }
                    if (file.photo) {
                        if (file.photo.size > 3000000) {
                            return response_1.response.error(req, res, {}, "file size too big");
                        }
                    }
                    // console.log("erkegnr")
                    if (file.photo && file.photo.filepath) {
                        product.photo.data = fs.readFileSync(file.photo.filepath);
                    }
                    else {
                        return response_1.response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
                    }
                    product.photo.contentType = file.photo.type;
                    const data = yield productService_1.productService.save(product);
                    data.photo = '';
                    // console.log(data, "rjnfber")
                    return response_1.response.send(req, res, data, "SUCCESS");
                }));
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        // 4. login user
        // loginUser = async (req: Request, res: Response) => {
        //     try{
        //         const {username, password} = req.body;
        //         const dbUser:any = await User.findOne({username:username}); 
        //         if (dbUser === undefined) {
        //             res.send({
        //                 status: 400,
        //                 message: "Invalid User"
        //             })
        //         }else {
        //             const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        //             if(isPasswordMatched === true) {
        //                 const payload = {username:username};
        //                 const jwtToken = jwt.sign(payload, "djsdbsbcnxnhbwdhj");
        //                 res.send({jwtToken})
        //             }else {
        //                 res.send({
        //                     status: 400,
        //                     message: "Incorrect Password"
        //                 })
        //             }
        //         }
        //     }catch(err:any){
        //         console.log(err)
        //         res.send({
        //         status: 400,
        //         message: err.message
        //         })
        //     }    
        // }
        // 5. update user
        // updateUser = async (req:Request, res:Response)=>{
        //     try{
        //         const _id = req.params.id;
        //         const result = await validation.updateUserValidation.validateAsync(req.body);
        //         const getUser = await User.findByIdAndUpdate(_id, result, {
        //             new: true
        //         });
        //         res.send({
        //             status: 200,
        //             message:"Success",
        //             data: getUser 
        //         })
        //     }catch(error:any){
        //         res.send({
        //             status: 400,
        //             message: error.message
        //         })
        //     }
        // }
        // // 6. delete user by id
        // deleteUser = async (req:Request, res:Response) =>{
        //     try{
        //         const deleteUser = await User.findByIdAndDelete(req.params.id)
        //         if (!deleteUser) {
        //             res.send({
        //                 status: 400,
        //                 message: "user not exists"
        //             })
        //         }
        //         res.send({
        //             status: 200,
        //             message: "Success",
        //             data: deleteUser
        //         })
        //     }catch(err:any){
        //         res.send({
        //             status: 400,
        //             message: err.message
        //         })
        //     }
        // }
        // // 7. login user profile 
        // loginUserProfile = async(req:Request, res: Response)=> {
        //     let { username } = req.body;
        //     const user = await User.findOne({username:username})
        //     res.send({
        //         status: 200,
        //         message:"Success",
        //         data: user
        //     });
        // }
    }
}
exports.productController = new ProductController();
