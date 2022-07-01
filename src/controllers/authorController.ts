import express, { Application, Request, Response } from "express";
import Author from "../models/authorModel";
import validation from "../joiValidation";

const app:Application = express();
app.use(express.json());

class authorApiCalls {
    
    // 1. get all authors
    allAuthors = async (req:Request, res:Response) =>{
        try{
            const records = await Author.find({})
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

    // 2.get single author 
    getAuthor = async (req:Request, res:Response) =>{
        try{
            const _id = req.params.id;
            const getAuthor = await Author.findById({_id})
            res.send({
                status: 200,
                message:"Success",
                data: getAuthor
                })
        }catch(err){
            res.send({
                status: 404,
                message:"Author not exists"
            })
        }
    }

    // 3.create author
    createAuthor = async (req:Request, res:Response) =>{
        try{
            const result = await validation.createAuthorValidation.validateAsync(req.body)
            const postAuthor = await Author.create({
                authorName:result.authorName,
                dob:result.dob,
                mobileNumber:result.mobileNumber,
                gender:result. gender,
                authorBooks: result.authorBooks
            })
            const data = await postAuthor.save()
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

    // 4. update author
    updateAuthor = async (req:Request, res:Response)=>{
        try{
            const _id = req.params.id;
            const result = await validation.updateAuthorValidation.validateAsync(req.body);
            const getAuthor = await Author.findByIdAndUpdate(_id, result, {
                new: true
            });
            res.send({
                status: 200,
                message:"Success",
                data: getAuthor 
            })
        }catch(error:any){
            res.send({
                status: 400,
                message: error.message
            })
        }
    }

    // 5. delete author by id
    deleteAuthor = async (req:Request, res:Response) =>{
        try{
            const deleteAuthor = await Author.findByIdAndDelete(req.params.id)
            if (!deleteAuthor) {
                res.send({
                    status: 400,
                    message: "Author not exists",
                })
            }
            res.send({
                status: 200,
                message: "Success",
                data: deleteAuthor
            })
        }catch(err:any){
            res.send({
                status: 400,
                message: err.message,
            })
        }
    }
}


export = new authorApiCalls;    