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
        /**
         * create category
         * @param req
         * @param res
         * @returns
         */
        this.createCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("create category start");
            try {
                const payload = req.body.attributes;
                const categoryData = {
                    name: payload.name
                };
                const resCategory = yield categoryService_1.categoryService.save(categoryData);
                if (!resCategory) {
                    return response_1.response.error(req, res, {}, "Error in save category");
                }
                return response_1.response.send(req, res, resCategory, "SUCCESS");
            }
            catch (error) {
                console.log(error, "******");
                return response_1.response.error(req, res, error, "some-thing-went-wrong");
            }
        });
        this.getCategoryById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                const categoryData = {
                    name: payload.name
                };
                const resCategory = yield categoryService_1.categoryService.save(categoryData);
                if (!resCategory) {
                    return response_1.response.error(req, res, {}, "Error in save category");
                }
                return response_1.response.send(req, res, resCategory, "SUCCESS");
            }
            catch (error) {
                return response_1.response.error(req, res, error, "some-thing-went-wrong");
            }
        });
        this.getAllCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                const categoryData = {
                    name: payload.name
                };
                const resCategory = yield categoryService_1.categoryService.save(categoryData);
                if (!resCategory) {
                    return response_1.response.error(req, res, {}, "Error in save category");
                }
                return response_1.response.send(req, res, resCategory, "SUCCESS");
            }
            catch (error) {
                return response_1.response.error(req, res, error, "some-thing-went-wrong");
            }
        });
        this.updateCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                const categoryData = {
                    name: payload.name
                };
                const resCategory = yield categoryService_1.categoryService.save(categoryData);
                if (!resCategory) {
                    return response_1.response.error(req, res, {}, "Error in save category");
                }
                return response_1.response.send(req, res, resCategory, "SUCCESS");
            }
            catch (error) {
                return response_1.response.error(req, res, error, "some-thing-went-wrong");
            }
        });
        this.deleteCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body.attributes;
                const categoryData = {
                    name: payload.name
                };
                const resCategory = yield categoryService_1.categoryService.save(categoryData);
                if (!resCategory) {
                    return response_1.response.error(req, res, {}, "Error in save category");
                }
                return response_1.response.send(req, res, resCategory, "SUCCESS");
            }
            catch (error) {
                return response_1.response.error(req, res, error, "some-thing-went-wrong");
            }
        });
    }
}
exports.categoryController = new CategoryController();
