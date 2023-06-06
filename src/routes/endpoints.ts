import { Router } from 'express';
import authenticateToken from '../middleware';
import { validator } from '../utils/validator';
import { middleware } from '../middlewares/index';
import { pagination } from '../middlewares/pagination';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';
import { orderController } from '../controllers/orderController';
import { productController } from '../controllers/productController';
import { categoryController } from '../controllers/categoryController';
import { cartController } from '../controllers/cartController';

class EndPoints {
    public router: Router;
    constructor() {
        this.router = Router();
    }
    configureRoutes(): Router {

        // Update user information (name, email, password)
        this.router.route('/users/:id')
            .put(userController.updateUser)
            .all(middleware.methodNotAllowed);

        // create category
        this.router.route('/categories')
            .post(validator.category, categoryController.createCategory)
            .all(middleware.methodNotAllowed);

        // update category
        this.router.route('/categories/:id')
            .put(validator.category, categoryController.updateCategory)
            .all(middleware.methodNotAllowed);

        // get category
        this.router.route('/category/:id')
            .get(validator.category, categoryController.getCategoryById)
            .all(middleware.methodNotAllowed);

        // get all categories
        this.router.route('/categories')
            .get(validator.category, categoryController.getAllCategories)
            .all(middleware.methodNotAllowed);

        // Fetching categories and associated products

        this.router.route('/categories/:id')
            .delete(validator.category, categoryController.deleteCategory)
            .all(middleware.methodNotAllowed);

        // create orders
        this.router.route('/order')
            .post(validator.create, orderController.createOrder)
            .all(middleware.methodNotAllowed);

        // get order details
        this.router.route('/orders/:id')
            .get(orderController.getOrderById)
            .all(middleware.methodNotAllowed);

        // update order
        this.router.route('/orders/:id')
            .put(orderController.updateOrderStatus)
            .all(middleware.methodNotAllowed);

        // Track order status

        // get all orders
        this.router.route('/orders')
            .get(pagination.validate, orderController.getAllOrders)
            .all(middleware.methodNotAllowed);

        // cancel order
        this.router.route('/order-cancel')
            .post(orderController.cancelOrder)
            .all(middleware.methodNotAllowed);

        // order history for user
        this.router.route('/order-history')
            .get(orderController.history)
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

        // all users
        this.router.route('/allUsers')
            .get(pagination.validate, authenticateToken, userController.allUsers)
            .all(middleware.methodNotAllowed);

        // /api/users/:userId: GET, PUT, DELETE endpoints for managing user profiles.

        // single user
        this.router.route('/user/:id')
            .get(userController.getUser)
            .all(middleware.methodNotAllowed);

        this.router.route('/verifyRefreshToken')
            .post(validator.refreshTokenBodyValidation, authController.verifyRefreshToken)
            .all(middleware.methodNotAllowed);

        // POST a new product
        this.router.route('/products')
            .post(validator.product, productController.createProduct)
            .all(middleware.methodNotAllowed);

        // Searching and filtering products

        // GET a specific product by ID
        this.router.route('/products/:id')
            .get(productController.getProductById)
            .all(middleware.methodNotAllowed);

        // PUT update a product
        this.router.route('/products/:id')
            .put(validator.product, productController.updateProduct)
            .all(middleware.methodNotAllowed);

        // GET all products
        this.router.route('/products')
            .post(pagination.validate, productController.getAllProducts)
            .all(middleware.methodNotAllowed);

        // delete product
        this.router.route('/product/:id')
            .delete(productController.deleteProduct)
            .all(middleware.methodNotAllowed);


        // add product to cart
        this.router.route('/cart')
            .post(validator.cart, cartController.addToCart)
            .all(middleware.methodNotAllowed);

        // GET user's cart items
        this.router.route('/cart')
            .get(cartController.getCartItems)
            .all(middleware.methodNotAllowed);

        // Update cart quantities
        this.router.route('/cart/:id')
            .put(cartController.updateCartItem)
            .all(middleware.methodNotAllowed);

        // Calculate cart totals (subtotal, taxes, shipping)

        // checkout process
        // this.router.route('/checkout')
        //     .post(validator.cart, cartController.checkout)
        //     .all(middleware.methodNotAllowed);

        // Remove products from the cart
        this.router.route('/cart/:id')
            .delete(cartController.removeFromCart)
            .all(middleware.methodNotAllowed);


        // review and ratings
        // payments
        // user profile 

        //   Search:
        // API Name: /api/search/products
        // Method Name:
        // searchProducts: GET endpoint to search for products based on keywords or filters.

        return this.router;
    }
}

export default EndPoints;
