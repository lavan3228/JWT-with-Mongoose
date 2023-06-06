import express, { Application, Request, Response } from "express";
import { categoryModel } from "../models/category";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import { categoryService } from "../service/categoryService";
import { common } from "../utils/common";
import { response } from "../utils/response";


const app: Application = express();
app.use(express.json());

class CategoryController {

    /**
     * create category
     * @param req 
     * @param res 
     * @returns 
     */
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

            return response.send(req, res, resCategory, "SUCCESS")
        } catch (error: any) {
            return response.error(req, res, error, "some-thing-went-wrong")
        }
    }

    getCategoryById = async (req, res) => {
        try {
            const payload = req.body.attributes;
            const categoryData: any = {
                name: payload.name
            }

            const resCategory = await categoryService.save(categoryData);
            if (!resCategory) {
                return response.error(req, res, {}, "Error in save category")
            }

            return response.send(req, res, resCategory, "SUCCESS")
        } catch (error: any) {
            return response.error(req, res, error, "some-thing-went-wrong")
        }
    }

    getAllCategories = async (req, res) => {
        try {
            const payload = req.body.attributes;
            const categoryData: any = {
                name: payload.name
            }

            const resCategory = await categoryService.save(categoryData);
            if (!resCategory) {
                return response.error(req, res, {}, "Error in save category")
            }

            return response.send(req, res, resCategory, "SUCCESS")
        } catch (error: any) {
            return response.error(req, res, error, "some-thing-went-wrong")
        }
    }

    updateCategory = async (req, res) => {
        try {
            const payload = req.body.attributes;
            const categoryData: any = {
                name: payload.name
            }

            const resCategory = await categoryService.save(categoryData);
            if (!resCategory) {
                return response.error(req, res, {}, "Error in save category")
            }

            return response.send(req, res, resCategory, "SUCCESS")
        } catch (error: any) {
            return response.error(req, res, error, "some-thing-went-wrong")
        }
    }

    deleteCategory = async (req, res) => {
        try {
            const payload = req.body.attributes;
            const categoryData: any = {
                name: payload.name
            }

            const resCategory = await categoryService.save(categoryData);
            if (!resCategory) {
                return response.error(req, res, {}, "Error in save category")
            }

            return response.send(req, res, resCategory, "SUCCESS")
        } catch (error: any) {
            return response.error(req, res, error, "some-thing-went-wrong")
        }
    }
}

export const categoryController = new CategoryController();
