import { array, boolean, number, string } from 'joi';
import mongoose, { Schema, model } from 'mongoose';
import Author from "./authorModel"

interface Book {
  bookName: string;
  authorId: any;
  price: number;
  rating: number;
  published: boolean
}

const authorSchema = new Schema<Book>({
  bookName : { type: String, required: true, unique: true, maxlength:64, trim: true},
  authorId: { type: mongoose.Types.ObjectId,ref:Author},
  price : { type: Number, required: true },
  rating : { type: Number, required: true },
  published: { type: Boolean, required: true }

});

//we are creating a new connection
const Book = model('Book', authorSchema);                    

export default Book;