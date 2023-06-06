import express, { Application } from "express";
import { productModel } from "../models/product";
import validation from "../joiValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import formidable from 'formidable';
import * as fs from "fs";
import { productService } from "../service/productService";
import { response } from '../utils/response';



const app: Application = express();

app.use(express.json());

class ProductController {
    /**
     * create product
     * @param req 
     * @param res 
     */
    createProduct = async (req, res) => {
        try {
            let form = new formidable.IncomingForm();
            // form = formidable({ multiples: true });
            // form.KeepExtensions = true;
            // console.log(form, "erfjbre")
            form.parse(req, async (err, filds, file: any) => {
                // console.log(filds, file, "erjkn")
                if (err) {
                    return response.error(req, res, {}, 'problem with image');
                }

                let product: any = new productModel(filds);
                const { name, description, price, category, stock } = product;

                if (!name || !description || !price || !category || !stock) {
                    return response.error(req, res, {}, "please include all fields");
                }

                if (file.photo) {
                    if (file.photo.size > 3000000) {
                        return response.error(req, res, {}, "file size too big");
                    }
                }
                // console.log("erkegnr")
                if (file.photo && file.photo.filepath) {
                    product.photo.data = fs.readFileSync(file.photo.filepath);
                } else {
                    return response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
                }

                product.photo.contentType = file.photo.type;

                const data: any = await productService.save(product);
                data.photo = '';
                // console.log(data, "rjnfber")
                return response.send(req, res, data, "SUCCESS");
            });
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    updateProduct = async (req, res) => {
        try {
            let form = new formidable.IncomingForm();
            // form = formidable({ multiples: true });
            // form.KeepExtensions = true;
            // console.log(form, "erfjbre")
            form.parse(req, async (err, filds, file: any) => {
                // console.log(filds, file, "erjkn")
                if (err) {
                    return response.error(req, res, {}, 'problem with image');
                }

                let product: any = new productModel(filds);
                const { name, description, price, category, stock } = product;

                if (!name || !description || !price || !category || !stock) {
                    return response.error(req, res, {}, "please include all fields");
                }

                if (file.photo) {
                    if (file.photo.size > 3000000) {
                        return response.error(req, res, {}, "file size too big");
                    }
                }
                // console.log("erkegnr")
                if (file.photo && file.photo.filepath) {
                    product.photo.data = fs.readFileSync(file.photo.filepath);
                } else {
                    return response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
                }

                product.photo.contentType = file.photo.type;

                const data: any = await productService.save(product);
                data.photo = '';
                // console.log(data, "rjnfber")
                return response.send(req, res, data, "SUCCESS");
            });
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    getProductById = async (req, res) => {
        try {
            let form = new formidable.IncomingForm();
            // form = formidable({ multiples: true });
            // form.KeepExtensions = true;
            // console.log(form, "erfjbre")
            form.parse(req, async (err, filds, file: any) => {
                // console.log(filds, file, "erjkn")
                if (err) {
                    return response.error(req, res, {}, 'problem with image');
                }

                let product: any = new productModel(filds);
                const { name, description, price, category, stock } = product;

                if (!name || !description || !price || !category || !stock) {
                    return response.error(req, res, {}, "please include all fields");
                }

                if (file.photo) {
                    if (file.photo.size > 3000000) {
                        return response.error(req, res, {}, "file size too big");
                    }
                }
                // console.log("erkegnr")
                if (file.photo && file.photo.filepath) {
                    product.photo.data = fs.readFileSync(file.photo.filepath);
                } else {
                    return response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
                }

                product.photo.contentType = file.photo.type;

                const data: any = await productService.save(product);
                data.photo = '';
                // console.log(data, "rjnfber")
                return response.send(req, res, data, "SUCCESS");
            });
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    getAllProducts = async (req, res) => {
        try {
            let form = new formidable.IncomingForm();
            // form = formidable({ multiples: true });
            // form.KeepExtensions = true;
            // console.log(form, "erfjbre")
            form.parse(req, async (err, filds, file: any) => {
                // console.log(filds, file, "erjkn")
                if (err) {
                    return response.error(req, res, {}, 'problem with image');
                }

                let product: any = new productModel(filds);
                const { name, description, price, category, stock } = product;

                if (!name || !description || !price || !category || !stock) {
                    return response.error(req, res, {}, "please include all fields");
                }

                if (file.photo) {
                    if (file.photo.size > 3000000) {
                        return response.error(req, res, {}, "file size too big");
                    }
                }
                // console.log("erkegnr")
                if (file.photo && file.photo.filepath) {
                    product.photo.data = fs.readFileSync(file.photo.filepath);
                } else {
                    return response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
                }

                product.photo.contentType = file.photo.type;

                const data: any = await productService.save(product);
                data.photo = '';
                // console.log(data, "rjnfber")
                return response.send(req, res, data, "SUCCESS");
            });
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    deleteProduct = async (req, res) => {
        try {
            let form = new formidable.IncomingForm();
            // form = formidable({ multiples: true });
            // form.KeepExtensions = true;
            // console.log(form, "erfjbre")
            form.parse(req, async (err, filds, file: any) => {
                // console.log(filds, file, "erjkn")
                if (err) {
                    return response.error(req, res, {}, 'problem with image');
                }

                let product: any = new productModel(filds);
                const { name, description, price, category, stock } = product;

                if (!name || !description || !price || !category || !stock) {
                    return response.error(req, res, {}, "please include all fields");
                }

                if (file.photo) {
                    if (file.photo.size > 3000000) {
                        return response.error(req, res, {}, "file size too big");
                    }
                }
                // console.log("erkegnr")
                if (file.photo && file.photo.filepath) {
                    product.photo.data = fs.readFileSync(file.photo.filepath);
                } else {
                    return response.error(req, res, { 'Invalid file path:': file.photo }, "Failed");
                }

                product.photo.contentType = file.photo.type;

                const data: any = await productService.save(product);
                data.photo = '';
                // console.log(data, "rjnfber")
                return response.send(req, res, data, "SUCCESS");
            });
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

