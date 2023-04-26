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
exports.categoryController = void 0;
const express_1 = __importDefault(require("express"));
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
const categoryService_1 = require("../service/categoryService");
const response_1 = require("../utils/response");
const app = (0, express_1.default)();
app.use(express_1.default.json());
class CategoryController {
    constructor() {
        // 1. get all books
        // allBooks = async (req:Request, res:Response) =>{
        //     try{
        //         const records = await categoryModel.find()
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
        // 2.get single book 
        // getBook = async (req:Request, res:Response) =>{
        //     try{
        //         const _id = req.params.id;
        //         const getBook = await Book.findById({_id})
        //         res.send({
        //             status: 200,
        //             message:"Success",
        //             data: getBook
        //             })
        //     }catch(err){
        //         res.send({
        //             status: 404,
        //             message:"Book not existed"
        //         })
        //     }
        // }
        // 3.create book
        this.createCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                const categoryData = {
                    name: payload.name
                };
                const resCategory = yield categoryService_1.categoryService.save(categoryData);
                if (!resCategory) {
                    return response_1.response.error(req, res, {}, "Error in save category");
                }
                // const data = await postBook.save()
                // const { bookName } = data
                // await Author.updateOne({ _id: data.authorId }, { $push: { authorBooks: bookName } })
                return response_1.response.send(req, res, resCategory, "SUCCESS");
            }
            catch (error) {
                return response_1.response.error(req, res, error, "some-thing-went-wrong");
            }
        });
        // 4. update book
        // updateBook = async (req: Request, res: Response) => {
        //     try {
        //         const _id = req.params.id;
        //         const result = await validation.updateBookValidation.validateAsync(req.body);
        //         const getBook = await Book.findByIdAndUpdate(_id, result, {
        //             new: true
        //         });
        //         res.send({
        //             status: 200,
        //             message: "Success",
        //             data: getBook
        //         })
        //     } catch (error: any) {
        //         res.send({
        //             status: 400,
        //             message: error.message
        //         })
        //     }
        // }
        // 5. delete book by id
        // deleteBook = async (req: Request, res: Response) => {
        //     try {
        //         const deleteBook = await Book.findByIdAndDelete(req.params.id)
        //         if (!deleteBook) {
        //             res.send({
        //                 status: 400,
        //                 message: "Book not exists"
        //             })
        //         }
        //         res.send({
        //             status: 200,
        //             message: "Success",
        //             data: deleteBook
        //         })
        //     } catch (err: any) {
        //         res.send({
        //             status: 400,
        //             message: err.message
        //         })
        //     }
        // }
        // allBooksWithQuery = async (req: Request, res: Response) => {
        //     try {
        //         //  let pipeline:any = [
        //         // {$max: "$price"}
        //         //  ];
        //         const records: any = await Book.find().skip(4)  //aggregate([{ $group: {_id: 'books',sum: { $sum/avg: '$price'}}}])//find().sort({"price": 1}).limit(1)//find({},{"bookName":1, price:1, "_id":0});
        //         res.send({
        //             status: 200,
        //             message: "Success",
        //             data: records
        //         })
        //     } catch (error: any) {
        //         res.send({
        //             status: 500,
        //             message: error.message
        //         })
        //     }
        // }
    }
}
exports.categoryController = new CategoryController();
