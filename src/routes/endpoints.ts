import { Router } from 'express';
import authenticateToken from '../middleware';
import { validator } from '../utils/validator';
import { middleware } from '../middlewares/index';
import { pagination } from '../middlewares/pagination';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';
import { cartController } from '../controllers/cartController';
import { orderController } from '../controllers/orderController';
import { productController } from '../controllers/productController';
import { categoryController } from '../controllers/categoryController';

class EndPoints {
    public router: Router;
    constructor() {
        this.router = Router();
    }
    configureRoutes(): Router {

        this.router.route('/verifyRefreshToken')
            .post(validator.refreshTokenBodyValidation, authController.verifyRefreshToken)
            .all(middleware.methodNotAllowed);

        // sign up user
        this.router.route('/register')
            .post(validator.signup, authController.registerUser)
            .all(middleware.methodNotAllowed);

        // sign in user
        this.router.route('/login')
            .post(validator.signin, authController.loginUser)
            .all(middleware.methodNotAllowed);

        // logout user
        this.router.route('/logout')
            .post(validator.refreshTokenBodyValidation, authController.logoutUser)
            .all(middleware.methodNotAllowed);

        // get user information and Update user information (name, email, password) and Delete user
        this.router.route('/myprofile')
            .get(authenticateToken, userController.getUser)
            .put(authenticateToken, userController.updateUser)  // pending 
            .put(authenticateToken, userController.deleteUser)
            .all(middleware.methodNotAllowed);

        // all users
        this.router.route('/allUsers')
            .get(authenticateToken, pagination.validate, userController.allUsers)
            .all(middleware.methodNotAllowed);

        // create category
        this.router.route('/categories')
            .post(authenticateToken, validator.category, categoryController.createCategory)
            .all(middleware.methodNotAllowed);

        // update category
        this.router.route('/categories/:id')
            .put(authenticateToken, validator.category, categoryController.updateCategory)
            .all(middleware.methodNotAllowed);

        // get category
        this.router.route('/category/:id')
            .get(authenticateToken, validator.category, categoryController.getCategoryById)
            .all(middleware.methodNotAllowed);

        // get all categories
        this.router.route('/categories')
            .get(authenticateToken, validator.category, categoryController.getAllCategories)
            .all(middleware.methodNotAllowed);

        // Fetching categories and associated products

        this.router.route('/categories/:id')
            .delete(authenticateToken, validator.category, categoryController.removeCategory)
            .all(middleware.methodNotAllowed);

        // create orders
        this.router.route('/order')
            .post(authenticateToken, validator.createOrder, orderController.createOrder)
            .all(middleware.methodNotAllowed);

        // get order details
        this.router.route('/orders/:id')
            .get(authenticateToken, orderController.getOrderById)
            .all(middleware.methodNotAllowed);

        // update order
        this.router.route('/orders/:id')
            .put(authenticateToken, orderController.updateOrderStatus)
            .all(middleware.methodNotAllowed);

        this.router.route('/order-track')
            .get(authenticateToken, orderController.orderTrack)
            .all(middleware.methodNotAllowed);

        // get all orders
        this.router.route('/orders')
            .get(authenticateToken, pagination.validate, orderController.getAllOrders)
            .all(middleware.methodNotAllowed);

        // cancel order
        this.router.route('/order-cancel')
            .post(authenticateToken, validator.cancelOrder, orderController.cancelOrder)
            .all(middleware.methodNotAllowed);

        // order history for user
        this.router.route('/order-history')
            .get(authenticateToken, pagination.validate, validator.orderHistory, orderController.history)
            .all(middleware.methodNotAllowed)

        // single user
        this.router.route('/user/:id')
            .get(authenticateToken, userController.getUser)
            .all(middleware.methodNotAllowed);

        // Searching and filtering products

        // POST a new product
        this.router.route('/products')
            .post(authenticateToken, productController.createProduct)
            .all(middleware.methodNotAllowed);

        // GET a specific product by ID
        this.router.route('/product/:id')
            .get(authenticateToken, productController.getProductById)
            .all(middleware.methodNotAllowed);

        // PUT update a product
        this.router.route('/products/:id') // pending
            .put(authenticateToken, validator.product, productController.updateProduct)
            .all(middleware.methodNotAllowed);

        // GET all products
        this.router.route('/allproducts')
            .get(authenticateToken, pagination.validate, productController.getAllProducts)
            .all(middleware.methodNotAllowed);

        // delete product
        this.router.route('/product/:id')
            .delete(authenticateToken, productController.deleteProduct)
            .all(middleware.methodNotAllowed);

        // add product to cart
        this.router.route('/cart/add')
            .post(authenticateToken, validator.addCart, cartController.addToCart)
            .all(middleware.methodNotAllowed);

        // add cart to wichlist
        this.router.route('/wichlist/add')
            .post(authenticateToken, validator.addWichList, cartController.moveToWichList)
            .all(middleware.methodNotAllowed);

        // Cart Remove
        this.router.route('/cart/remove')
            .post(authenticateToken, validator.removeCart, cartController.removeFromCart)
            .all(middleware.methodNotAllowed)

        // Cart List
        this.router.route('/cart/list')
            .get(authenticateToken, pagination.validate, cartController.list)
            .all(middleware.methodNotAllowed);

        // checkout process
        this.router.route('/checkout')
            .post(authenticateToken, validator.checkout, cartController.checkout)
            .all(middleware.methodNotAllowed);

        return this.router;
    }
}

export default EndPoints;


        // review and ratings
        // payments
        // user profile

        //   Search:
        // API Name: /api/search/products
        // Method Name:
        // searchProducts: GET endpoint to search for products based on keywords or filters.