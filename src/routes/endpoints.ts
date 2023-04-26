import { Router } from 'express';
import { middleware } from '../middlewares/index';
import { userController } from '../controllers/userController';
import { categoryController } from '../controllers/categoryController';
import { orderController } from '../controllers/orderController';
import { productController } from '../controllers/productController';
import { authController } from '../controllers/authController';
import { pagination } from '../middlewares/pagination';
import { validator } from '../utils/validator';


class EndPoints {
    public router: Router;
    constructor() {
        this.router = Router();
    }
    configureRoutes(): Router {

        // this.router.route('/createUser')
        //     .post(userController.createUser)
        //     .all(middleware.methodNotAllowed);

        this.router.route('/createCategory')
            .post(validator.category, categoryController.createCategory)
            .all(middleware.methodNotAllowed);

        this.router.route('/createOrder')
            .post(validator.create, orderController.createOrder)
            .all(middleware.methodNotAllowed);

        this.router.route('/createProduct')
            .post(validator.product, productController.createProduct)
            .all(middleware.methodNotAllowed);

        this.router.route('/signup')
            .post(validator.signup, authController.signup)
            .all(middleware.methodNotAllowed);

        this.router.route('/signin')
            .get(validator.signin, authController.signin)
            .all(middleware.methodNotAllowed);

        this.router.route('/allUsers')
            .get(pagination.validate, userController.allUsers)
            .all(middleware.methodNotAllowed);

        this.router.route('/user/:id')
            .get(userController.getUser)
            .all(middleware.methodNotAllowed);

        return this.router;
    }
}

export default EndPoints;
