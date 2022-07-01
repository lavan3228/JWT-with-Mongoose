import Joi from "joi";

class validation {
    
    // 1. user validation

    createUserValidation = Joi.object({
            username:Joi.string().pattern(/^[a-z or A-Zor .]+$/).min(2).max(16).trim().required(),
            mobileNumber:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            mail:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).min(5).required(),
            password:Joi.string().min(6).max(16).required()
        });

    updateUserValidation = Joi.object({
            username:Joi.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().optional(),
            mobileNumber:Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
            mail:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).min(5).optional(),
            password:Joi.string().min(6).max(16).optional()
        });  

    // 2. author validation

    createAuthorValidation = Joi.object({
            authorName:Joi.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().required(),
            dob: Joi.date().raw().required(),
            mobileNumber:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            gender:Joi.string().valid("male","female").required(),
            authorBooks:Joi.array().required()
        });

    updateAuthorValidation = Joi.object({
            authorName:Joi.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().optional(),
            dob: Joi.date().raw().optional(),
            mobileNumber:Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
            gender:Joi.string().valid("male","female").optional(),
            authorBooks:Joi.array().optional()
        });    
        
    // 3. book validation 

    createBookValidation = Joi.object({
            bookName:Joi.string().min(2).max(64).trim().required(),
            authorId: Joi.string().required(),
            price:Joi.number().integer().min(200).max(1500).required(),
            rating:Joi.number().min(1).max(5).required(),
            published:Joi.boolean().required()
        });

    updateBookValidation = Joi.object({
            bookName:Joi.string().min(2).max(64).trim().optional(),
            authorId: Joi.string().optional(),
            price:Joi.number().integer().min(200).max(1500).optional(),
            rating:Joi.number().min(1).max(5).optional(),
            published:Joi.boolean().optional()
        });    
}    

export default new validation;