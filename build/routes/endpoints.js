"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../middlewares/index");
const userController_1 = require("../controllers/userController");
const categoryController_1 = require("../controllers/categoryController");
const orderController_1 = require("../controllers/orderController");
const productController_1 = require("../controllers/productController");
const authController_1 = require("../controllers/authController");
const pagination_1 = require("../middlewares/pagination");
const validator_1 = require("../utils/validator");
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
        this.router.route('/signup')
            .post(validator_1.validator.signup, authController_1.authController.signup)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/signin')
            .get(validator_1.validator.signin, authController_1.authController.signin)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/allUsers')
            .get(pagination_1.pagination.validate, userController_1.userController.allUsers)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/user/:id')
            .get(userController_1.userController.getUser)
            .all(index_1.middleware.methodNotAllowed);
        return this.router;
    }
}
exports.default = EndPoints;
