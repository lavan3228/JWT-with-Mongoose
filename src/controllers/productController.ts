import express, { Application } from "express";
import { productModel } from "../models/product";
import validation from "../joiValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from 'moment';
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import formidable from 'formidable';
import * as fs from "fs";
import { productService } from "../service/productService";
import { response } from '../utils/response';
import { common } from "../utils/common";
import { productStatus } from "../utils/enumValues";
const { PDFDocumentFactory, PDFDocumentWriter, StandardFonts } = require('pdf-lib');
// import PDFDocumentFactory, { PDFDocumentWriter } from 'pdf-lib';
// const fs = require('fs');



const app: Application = express();

app.use(express.json());

class ProductController {
    /**
     * create product
     * @param req 
     * @param res 
     */
    createProduct = async (req, res) => {
        console.log("create product start lavan")
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
            }

            const saveProduct = await productService.save(result);
            if (!saveProduct) {
                return response.error(req, res, {}, "save product failed")
            }
            return response.send(req, res, {}, "products successfully saved");
        } catch (error: any) {
            console.log(error, "*******")
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    updateProduct = async (req, res) => {
        try {

            // TODO 
            console.log("get user profile start", req.user_id);

            const user_id = req.user_id;
            const productId = req.params.id;

            if (!common.isValid(productId)) {
                return response.error(req, res, {}, "provide product id")
            }

            const updateStatusAsInactive = {
                status: productStatus['INACTIVE'],  // In active
                modified_date_time: moment().format(),
                modified_by: req.user_id
            };

            const productUpdate: any = await productService.update({ userId: user_id, _id: productId }, updateStatusAsInactive);
            log.info({ jsonObject: productUpdate, description: 'product status update Response' });

            if (!common.isObject(productUpdate)) {
                return response.error(req, res, {}, 'product not updated');
            }

            return response.send(req, res, {}, 'SUCCESSFULLY-UPDATED-PRODUCT')
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    getProductById = async (req, res) => {
        try {
            console.log("get user profile start", req.user_id);

            const user_id = req.user_id;
            const productId = req.params.id;

            if (!common.isValid(productId)) {
                return response.error(req, res, {}, "provide product id")
            }

            const condition = {
                userId: user_id,
                _id: productId,
                status: productStatus.ACTIVE
            }
            const getProduct: any = await productService.find(condition);
            console.log(condition, getProduct, '325468759');

            if (!getProduct) {
                return response.error(req, res, {}, "User not found")
            }

            return response.send(req, res, { getProduct, count: getProduct.length }, "SUCCESS")
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    getAllProducts = async (req, res) => {
        try {
            console.log("all users start", req.user_id)

            const condition = {
                status: productStatus.ACTIVE
            }

            const allProducts: any = await productService.findAll(condition);

            if (!allProducts || allProducts.length <= 0) {
                return response.error(req, res, {}, "USER DETAILS NOT FOUND");
            }

            // const count = await userService.countAll();
            return response.send(req, res, allProducts, "SUCCESS");
        } catch (error: any) {
            return response.error(req, res, {}, "SOMETHING WENT WRONG")
        }
    }

    deleteProduct = async (req, res) => {
        console.log("delete proct start");
        try {
            const userId = req.user_id;
            console.log(userId, "userid");

            const payload = req.params.id;
            console.log(payload, "id3");

            if (!common.isValid(payload)) {
                return response.error(req, res, {}, "required product id in params")
            }

            const productId = payload;
            const productDelete = {
                status: productStatus['INACTIVE'],  // In active
                modified_date_time: moment().format(),
                modified_by: req.user_id
            }

            console.log(productId, productDelete, "dj4j");


            const removeProduct: any = await productService.update({ _id: productId, userId: userId }, productDelete);
            log.info({ jsonObject: removeProduct, description: 'product Remove Response' });

            if (!common.isObject(removeProduct)) {
                return response.error(req, res, {}, 'PRODUCT-NOT-REMOVED');
            }

            return response.send(req, res, {}, 'SUCCESSFULLY-REMOVED-PRODUCT')


        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

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


export const productController = new ProductController();


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