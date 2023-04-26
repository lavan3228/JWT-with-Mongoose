import express, { Application, Request, Response } from "express";
// import Book from "../models/order";
// import validation from "../joiValidation";
import { categoryModel } from "../models/category";
import { any } from "joi";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import { categoryService } from "../service/categoryService";
import { common } from "../utils/common";
import { response } from "../utils/response";


const app: Application = express();
app.use(express.json());

class CategoryController {

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
    createCategory = async (req, res) => {
        try {
            const payload = req.body.attributes;
            const categoryData: any = {
                name: payload.name
            }

            const resCategory = await categoryService.save(categoryData);
            if (!resCategory) {
                return response.error(req, res, {}, "Error in save category")
            }
            // const data = await postBook.save()

            // const { bookName } = data

            // await Author.updateOne({ _id: data.authorId }, { $push: { authorBooks: bookName } })

            return response.send(req, res, resCategory, "SUCCESS")
        } catch (error: any) {
            return response.error(req, res, error, "some-thing-went-wrong")
        }
    }

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


export const categoryController = new CategoryController();