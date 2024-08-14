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
exports.productController = void 0;
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
const productService_1 = require("../service/productService");
const response_1 = require("../utils/response");
const common_1 = require("../utils/common");
const enumValues_1 = require("../utils/enumValues");
const { PDFDocumentFactory, PDFDocumentWriter, StandardFonts } = require('pdf-lib');
// import PDFDocumentFactory, { PDFDocumentWriter } from 'pdf-lib';
// const fs = require('fs');
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
            console.log("create product start lavan");
            try {
                const payload = req.body;
                const result = {
                    productName: payload.productName,
                    description: payload.description,
                    price: payload.price,
                    category: payload.category,
                    stock: payload.stock,
                    imageUrl: payload.imageUrl,
                    userId: req.user_id
                };
                const saveProduct = yield productService_1.productService.save(result);
                if (!saveProduct) {
                    return response_1.response.error(req, res, {}, "save product failed");
                }
                return response_1.response.send(req, res, {}, "products successfully saved");
            }
            catch (error) {
                console.log(error, "*******");
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO 
                console.log("get user profile start", req.user_id);
                const user_id = req.user_id;
                const productId = req.params.id;
                if (!common_1.common.isValid(productId)) {
                    return response_1.response.error(req, res, {}, "provide product id");
                }
                const updateStatusAsInactive = {
                    status: enumValues_1.productStatus['INACTIVE'], // In active
                    modified_date_time: (0, moment_1.default)().format(),
                    modified_by: req.user_id
                };
                const productUpdate = yield productService_1.productService.update({ userId: user_id, _id: productId }, updateStatusAsInactive);
                log.info({ jsonObject: productUpdate, description: 'product status update Response' });
                if (!common_1.common.isObject(productUpdate)) {
                    return response_1.response.error(req, res, {}, 'product not updated');
                }
                return response_1.response.send(req, res, {}, 'SUCCESSFULLY-UPDATED-PRODUCT');
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get user profile start", req.user_id);
                const user_id = req.user_id;
                const productId = req.params.id;
                if (!common_1.common.isValid(productId)) {
                    return response_1.response.error(req, res, {}, "provide product id");
                }
                const condition = {
                    userId: user_id,
                    _id: productId,
                    status: enumValues_1.productStatus.ACTIVE
                };
                const getProduct = yield productService_1.productService.find(condition);
                console.log(condition, getProduct, '325468759');
                if (!getProduct) {
                    return response_1.response.error(req, res, {}, "User not found");
                }
                return response_1.response.send(req, res, { getProduct, count: getProduct.length }, "SUCCESS");
            }
            catch (error) {
                res.send({
                    status: 400,
                    message: error.message
                });
            }
        });
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("all users start", req.user_id);
                const condition = {
                    status: enumValues_1.productStatus.ACTIVE
                };
                const allProducts = yield productService_1.productService.findAll(condition);
                if (!allProducts || allProducts.length <= 0) {
                    return response_1.response.error(req, res, {}, "USER DETAILS NOT FOUND");
                }
                // const count = await userService.countAll();
                return response_1.response.send(req, res, allProducts, "SUCCESS");
            }
            catch (error) {
                return response_1.response.error(req, res, {}, "SOMETHING WENT WRONG");
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("delete proct start");
            try {
                const userId = req.user_id;
                console.log(userId, "userid");
                const payload = req.params.id;
                console.log(payload, "id3");
                if (!common_1.common.isValid(payload)) {
                    return response_1.response.error(req, res, {}, "required product id in params");
                }
                const productId = payload;
                const productDelete = {
                    status: enumValues_1.productStatus['INACTIVE'], // In active
                    modified_date_time: (0, moment_1.default)().format(),
                    modified_by: req.user_id
                };
                console.log(productId, productDelete, "dj4j");
                const removeProduct = yield productService_1.productService.update({ _id: productId, userId: userId }, productDelete);
                log.info({ jsonObject: removeProduct, description: 'product Remove Response' });
                if (!common_1.common.isObject(removeProduct)) {
                    return response_1.response.error(req, res, {}, 'PRODUCT-NOT-REMOVED');
                }
                return response_1.response.send(req, res, {}, 'SUCCESSFULLY-REMOVED-PRODUCT');
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
// const filePath = req.file.path;
// console.log(filePath, "jshdjh");
// let form = new formidable.IncomingForm();
// // form = formidable({ multiples: true });
// // form.KeepExtensions = true;
// console.log(form, "erfjbre")
// form.parse(req, async (err, filds, file: any) => {
//     console.log("djdjdk")
//     console.log(file, "erjkn");
// if (err) {
//     return response.error(req, res, {}, 'problem with image');
// }
// let product: any = new productModel(filds);
// const { productName, description, price, category, stock, userId } = product;
// if (!productName || !description || !price || !category || !stock || !userId) {
//     return response.error(req, res, {}, "please include all fields");
// }
// if (file.photo) {
//     if (file.photo.size > 3000000) {
//         return response.error(req, res, {}, "file size too big");
//     }
// }
// console.log("erkegnr")
// if (file.photo && file.photo.filepath) {
//     product.photo.data = fs.readFileSync(file.photo.filepath);
// } else {
//     return response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
// }
//     product.photo.contentType = file.photo.type;
//     const data: any = await productService.save(product);
//     data.photo = '';
//     // console.log(data, "rjnfber")
//     return response.send(req, res, data, "SUCCESS");
// const fileBytes: any = fs.readFileSync(file);
// // Load the PDF document from the file bytes
// const pdfDoc: any = await PDFDocumentFactory.load(fileBytes);
// const key = 'b41889aea5af4337aef6fab11ade3b94';
// const password = 'U2FsdGVkX185hRDDxUsUgNO65V17Z1ALGbCRqtIp3XVvtCBnSdcdUXadJ3lxqzB3'
// // Set the encryption algorithm and password
// pdfDoc.setEncryptionAlgorithm('aes256', true, key, password);
// // Remove the existing security handler (if any)
// pdfDoc.removeSecurity();
// // Save the decrypted PDF to a new buffer
// const pdfBytes = await PDFDocumentWriter.saveToBytes(pdfDoc);
// // Write the decrypted PDF buffer to a new file
// fs.writeFileSync('decrypted.pdf', pdfBytes);
//     console.log('PDF decrypted successfully!');
// });
// console.log("jsjdshd")
