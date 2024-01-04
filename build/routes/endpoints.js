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
const cartController_1 = require("../controllers/cartController");
const orderController_1 = require("../controllers/orderController");
const productController_1 = require("../controllers/productController");
const categoryController_1 = require("../controllers/categoryController");
class EndPoints {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    configureRoutes() {
        this.router.route('/verifyRefreshToken')
            .post(validator_1.validator.refreshTokenBodyValidation, authController_1.authController.verifyRefreshToken)
            .all(index_1.middleware.methodNotAllowed);
        // sign up user
        this.router.route('/register')
            .post(validator_1.validator.signup, authController_1.authController.registerUser)
            .all(index_1.middleware.methodNotAllowed);
        // sign in user
        this.router.route('/login')
            .post(validator_1.validator.signin, authController_1.authController.loginUser)
            .all(index_1.middleware.methodNotAllowed);
        // logout user
        this.router.route('/logout')
            .post(validator_1.validator.refreshTokenBodyValidation, authController_1.authController.logoutUser)
            .all(index_1.middleware.methodNotAllowed);
        // get user information and Update user information (name, email, password) and Delete user
        this.router.route('/myprofile')
            .get(middleware_1.default, userController_1.userController.getUser)
            .put(middleware_1.default, userController_1.userController.updateUser) // pending 
            .all(index_1.middleware.methodNotAllowed);
        // all users
        this.router.route('/allUsers')
            .get(middleware_1.default, pagination_1.pagination.validate, userController_1.userController.allUsers)
            .all(index_1.middleware.methodNotAllowed);
        // create category
        this.router.route('/categories')
            .post(middleware_1.default, validator_1.validator.category, categoryController_1.categoryController.createCategory)
            .all(index_1.middleware.methodNotAllowed);
        // update category
        this.router.route('/categories/:id')
            .put(middleware_1.default, validator_1.validator.category, categoryController_1.categoryController.updateCategory)
            .all(index_1.middleware.methodNotAllowed);
        // get category
        this.router.route('/category/:id')
            .get(middleware_1.default, validator_1.validator.category, categoryController_1.categoryController.getCategoryById)
            .all(index_1.middleware.methodNotAllowed);
        // get all categories
        this.router.route('/categories')
            .get(middleware_1.default, validator_1.validator.category, categoryController_1.categoryController.getAllCategories)
            .all(index_1.middleware.methodNotAllowed);
        // Fetching categories and associated products
        this.router.route('/categories/:id')
            .delete(middleware_1.default, validator_1.validator.category, categoryController_1.categoryController.deleteCategory)
            .all(index_1.middleware.methodNotAllowed);
        // create orders
        this.router.route('/order')
            .post(middleware_1.default, validator_1.validator.createOrder, orderController_1.orderController.createOrder)
            .all(index_1.middleware.methodNotAllowed);
        // get order details
        this.router.route('/orders/:id')
            .get(middleware_1.default, orderController_1.orderController.getOrderById)
            .all(index_1.middleware.methodNotAllowed);
        // update order
        this.router.route('/orders/:id')
            .put(middleware_1.default, orderController_1.orderController.updateOrderStatus)
            .all(index_1.middleware.methodNotAllowed);
        this.router.route('/order-track')
            .get(middleware_1.default, orderController_1.orderController.orderTrack)
            .all(index_1.middleware.methodNotAllowed);
        // get all orders
        this.router.route('/orders')
            .get(middleware_1.default, pagination_1.pagination.validate, orderController_1.orderController.getAllOrders)
            .all(index_1.middleware.methodNotAllowed);
        // cancel order
        this.router.route('/order-cancel')
            .post(middleware_1.default, validator_1.validator.cancelOrder, orderController_1.orderController.cancelOrder)
            .all(index_1.middleware.methodNotAllowed);
        // order history for user
        this.router.route('/order-history')
            .get(middleware_1.default, pagination_1.pagination.validate, validator_1.validator.orderHistory, orderController_1.orderController.history)
            .all(index_1.middleware.methodNotAllowed);
        // single user
        this.router.route('/user/:id')
            .get(middleware_1.default, userController_1.userController.getUser)
            .all(index_1.middleware.methodNotAllowed);
        // Searching and filtering products
        // POST a new product
        this.router.route('/products')
            .post(middleware_1.default, productController_1.productController.createProduct)
            .all(index_1.middleware.methodNotAllowed);
        // GET a specific product by ID
        this.router.route('/product/:id')
            .get(middleware_1.default, productController_1.productController.getProductById)
            .all(index_1.middleware.methodNotAllowed);
        // PUT update a product
        this.router.route('/products/:id') // pending
            .put(middleware_1.default, validator_1.validator.product, productController_1.productController.updateProduct)
            .all(index_1.middleware.methodNotAllowed);
        // GET all products
        this.router.route('/allproducts')
            .get(middleware_1.default, pagination_1.pagination.validate, productController_1.productController.getAllProducts)
            .all(index_1.middleware.methodNotAllowed);
        // delete product
        this.router.route('/product/:id')
            .delete(middleware_1.default, productController_1.productController.deleteProduct)
            .all(index_1.middleware.methodNotAllowed);
        // add product to cart
        this.router.route('/cart/add')
            .post(middleware_1.default, validator_1.validator.addCart, cartController_1.cartController.addToCart)
            .all(index_1.middleware.methodNotAllowed);
        // add cart to wichlist
        this.router.route('/wichlist/add')
            .post(middleware_1.default, validator_1.validator.addWichList, cartController_1.cartController.moveToWichList)
            .all(index_1.middleware.methodNotAllowed);
        // Cart Remove
        this.router.route('/cart/remove')
            .post(middleware_1.default, validator_1.validator.removeCart, cartController_1.cartController.removeFromCart)
            .all(index_1.middleware.methodNotAllowed);
        // Cart List
        this.router.route('/cart/list')
            .get(middleware_1.default, pagination_1.pagination.validate, cartController_1.cartController.list)
            .all(index_1.middleware.methodNotAllowed);
        // checkout process
        this.router.route('/checkout')
            .post(middleware_1.default, validator_1.validator.checkout, cartController_1.cartController.checkout)
            .all(index_1.middleware.methodNotAllowed);
        return this.router;
    }
}
exports.default = EndPoints;
// review and ratings
// payments
// user profile
//   Search:
// API Name: /api/search/products
// Method Name:
// searchProducts: GET endpoint to search for products based on keywords or filters.
