"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware"));
const validator_1 = require("../utils/validator");
const index_1 = require("../middlewares/index");
const pagination_1 = require("../middlewares/pagination");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const orderController_1 = require("../controllers/orderController");
const productController_1 = require("../controllers/productController");
const categoryController_1 = require("../controllers/categoryController");
class EndPoints {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    configureRoutes() {
        // this.router.route('/createUser')
        //     .post(userController.createUser)
        //     .all(middleware.methodNotAllowed);
        this.router.route('/createCategory')
            .post(validator_1.validator.category, categoryController_1.categoryController.createCategory)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/createOrder')
            .post(validator_1.validator.create, orderController_1.orderController.createOrder)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/createProduct')
            .post(validator_1.validator.product, productController_1.productController.createProduct)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/register')
            .post(validator_1.validator.signup, authController_1.authController.signup)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/login')
            .post(validator_1.validator.signin, authController_1.authController.signin)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/allUsers')
            .get(pagination_1.pagination.validate, middleware_1.default, userController_1.userController.allUsers)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/user/:id')
            .get(userController_1.userController.getUser)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/verifyRefreshToken')
            .post(validator_1.validator.refreshTokenBodyValidation, authController_1.authController.verifyRefreshToken)
            .all(index_1.middleware.methodNotAllowed);
        // logout user
        this.router.route('/signout')
            .get(validator_1.validator.refreshTokenBodyValidation, authController_1.authController.signout)
            .all(index_1.middleware.methodNotAllowed);
        // router.get('/items', itemController.get_items);
        // router.post('/items',itemController.post_item);
        // router.put('/items/:id',itemController.update_item);
        // router.delete('/items/:id',itemController.delete_item);
        // / router.get('/cart/:id',cartController.get_cart_items);
        // router.post('/cart/:id',cartController.add_cart_item);
        // router.delete('/cart/:userId/:itemId',cartController.delete_item);
        return this.router;
    }
}
exports.default = EndPoints;
