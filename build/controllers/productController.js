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
// module.exports.get_items = (req, res) => {
//     Item.find().sort({ date: -1 }).then(items => res.json(items));
// }
// module.exports.post_item = (req, res) => {
//     const newItem = new Item(req.body);
//     newItem.save().then(item => res.json(item));
// }
// module.exports.update_item = (req, res) => {
//     Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (item) {
//         Item.findOne({ _id: req.params.id }).then(function (item) {
//             res.json(item);
//         });
//     });
// }
// module.exports.delete_item = (req, res) => {
//     Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
//         res.json({ success: true });
//     });
// }
