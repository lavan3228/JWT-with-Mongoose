import { array, string } from 'joi';
import { Schema, model } from 'mongoose';

interface Author {
  authorName: string;
  dob: Date;
  mobileNumber: string;
  gender: string;
  authorBooks: string[];
  
}

const authorSchema = new Schema<Author>({
  authorName: { type: String, required: true, unique: true, maxlength:32, trim: true},
  dob:{ type: Date, required: true},
  mobileNumber: { type: String, unique:true, required: true, trim: true},
  gender: { type: String, required: true},
  authorBooks: [{ type: String, required: true }]
});

//we are creating a new connection
const Author = model('Author', authorSchema);                    

export default  Author;