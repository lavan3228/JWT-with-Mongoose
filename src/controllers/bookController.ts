import express, { Application, Request, Response } from "express";
import Book from "../models/bookModel";
import validation from "../joiValidation";
import Author from "../models/authorModel";


const app:Application = express();
app.use(express.json());

class bookApiCalls {
    
    // 1. get all books
    allBooks = async (req:Request, res:Response) =>{
        try{
            const records = await Book.find()
            res.send({
                status:200,
                message:"Success",
                data: records
            })
        }catch(error:any){
            res.send({
                status:500,
                message: error.message
            })
        }
    }

    // 2.get single book 
    getBook = async (req:Request, res:Response) =>{
        try{
            const _id = req.params.id;
            const getBook = await Book.findById({_id})
            res.send({
                status: 200,
                message:"Success",
                data: getBook
                })
        }catch(err){
            res.send({
                status: 404,
                message:"Book not existed"
            })
        }
    }

    // 3.create book
    createBook = async (req:Request, res:Response) =>{
        try{
            const result = await validation.createBookValidation.validateAsync(req.body)
            const postBook = await Book.create({
                bookName:result.bookName,
                authorId:result.authorId,
                price:result. price,
                rating: result.rating,
                published:result.published
            })
            const data = await postBook.save()
            
            const { bookName } = data

            await Author.updateOne({_id:data.authorId},{$push:{authorBooks:bookName}})
            
            res.send({
                status: 201,
                message: "Success",
                data: data
            })
        }catch(error:any) {
            res.send({
                status: 400,
                message: error.message
            
            });
        }
    }

    // 4. update book
    updateBook = async (req:Request, res:Response)=>{
        try{
            const _id = req.params.id;
            const result = await validation.updateBookValidation.validateAsync(req.body);
            const getBook = await Book.findByIdAndUpdate(_id, result, {
                new: true
            });
            res.send({
                status: 200,
                message:"Success",
                data: getBook 
            })
        }catch(error:any){
            res.send({
                status: 400,
                message: error.message
            })
        }
    }

    // 5. delete book by id
    deleteBook = async (req:Request, res:Response) =>{
        try{
            const deleteBook = await Book.findByIdAndDelete(req.params.id)
            if (!deleteBook) {
                res.send({
                    status: 400,
                    message: "Book not exists"
                })
            }
            res.send({
                status: 200,
                message: "Success",
                data: deleteBook
            })
        }catch(err:any){
            res.send({
                status: 400,
                message: err.message
            })
        }
    }

    allBooksWithQuery = async (req:Request, res:Response) =>{
        try{
            const records = await Book.find({$or:[{price: {$lte: 600}},{rating:{$gte:4}}]})
            res.send({
                status:200,
                message:"Success",
                data: records
            })
        }catch(error:any){
            res.send({
                status:500,
                message: error.message
            })
        }
    }
}


export = new bookApiCalls; 