'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const _ = __importStar(require("lodash"));
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
// import validation from "../joiValidation";
// import Author from "../models/category";
const orderService_1 = require("../service/orderService");
const response_1 = require("../utils/response");
const common_1 = require("../utils/common");
// router.get('/order/:id',orderController.get_orders);
// router.post('/order/:id',orderController.checkout);
class OrderController {
    constructor() {
        // create order
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ehrfj");
                const payload = req.body;
                const user_id = req.user_id;
                const saveOrderData = {
                    products: payload.products,
                    transaction_id: payload.transaction_id,
                    amount: payload.amount,
                    totalAmount: payload.totalAmount,
                    userId: user_id,
                    address: payload.address
                };
                const orderData = yield orderService_1.orderService.save(saveOrderData);
                if (!orderData) {
                    return response_1.response.error(req, res, {}, "Error in save order data");
                }
                return response_1.response.send(req, res, orderData, "SUCCESS");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, err, "Something Went Wrong");
            }
        });
        this.getAllOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get Orders start");
                const user_id = req.user_id;
                const orderCondition = {
                    userId: user_id
                };
                const orderData = yield orderService_1.orderService.find(orderCondition);
                console.log(orderData, 'fnfhd7');
                if (!orderData) {
                    return response_1.response.error(req, res, {}, "Error when getting  all orders data");
                }
                return response_1.response.send(req, res, orderData, "SUCCESS");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, err, "Something Went Wrong");
            }
        });
        // get order
        this.updateOrderStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ehrfj");
                const payload = req.body.attributes;
                const saveOrderData = {
                    transaction_id: payload.transaction_id,
                    amount: payload.amount,
                    address: payload.address
                };
                const orderData = yield orderService_1.orderService.save(saveOrderData);
                if (!orderData) {
                    return response_1.response.error(req, res, {}, "Error in save order data");
                }
                return response_1.response.send(req, res, orderData, "SUCCESS");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, err, "Something Went Wrong");
            }
        });
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ehrfj");
                const payload = req.body.attributes;
                const saveOrderData = {
                    transaction_id: payload.transaction_id,
                    amount: payload.amount,
                    address: payload.address
                };
                const orderData = yield orderService_1.orderService.save(saveOrderData);
                if (!orderData) {
                    return response_1.response.error(req, res, {}, "Error in save order data");
                }
                return response_1.response.send(req, res, orderData, "SUCCESS");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, err, "Something Went Wrong");
            }
        });
        this.cancelOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ehrfj");
                const payload = req.body.attributes;
                const saveOrderData = {
                    transaction_id: payload.transaction_id,
                    amount: payload.amount,
                    address: payload.address
                };
                const orderData = yield orderService_1.orderService.save(saveOrderData);
                if (!orderData) {
                    return response_1.response.error(req, res, {}, "Error in save order data");
                }
                return response_1.response.send(req, res, orderData, "SUCCESS");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, err, "Something Went Wrong");
            }
        });
        /**
         * order history details
         * @param req
         * @param res
         * @returns
         */
        this.history = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const condition = {
                    _id: req.query.orderId,
                    // status: orderStatus.PENDING,
                };
                const page = Number(req.query.page);
                const size = Number(req.query.size);
                const options = {
                    limit: size, skip: (page - 1) * size, sort: { modified_date_time: -1 }
                };
                const list = yield orderService_1.orderService.getOrderDetails(condition, options);
                list.page = page;
                list.size = size;
                return response_1.response.send(req, res, list, 'SUCCESS');
            }
            catch (err) {
                return response_1.response.error(req, res, { message: err }, 'SOME-THING-WENT-WRONG');
            }
        });
        this.orderTrack = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!common_1.common.isValid(req.query.id)) {
                    log.error('Order id not provided' + req.query.id);
                    return response_1.response.error(req, res, {}, 'INVALID-INPUTS');
                }
                const condition = {
                    _id: (req.query.id)
                };
                let result = yield orderService_1.orderService.orderTracking(condition);
                result = JSON.parse(JSON.stringify(result));
                const finalTests = [];
                const testData = result.test_info;
                if (testData.length) {
                    yield testData.map((test) => __awaiter(this, void 0, void 0, function* () {
                        // const allowedStatus = [testStatus['ACTIVE'], testStatus['CANCELLED']];
                        // if (allowedStatus.includes(test.status) && (test.is_supplementary_item === 0 || test.is_supplementary_test === 0 ||
                        //     (test.is_supplementary_test === undefined && test.is_supplementary_item === undefined))) {
                        //     finalTests.push(test);
                        // }
                    }));
                }
                result.test_info = finalTests;
                // getting map_link from order_status
                if (result.order_unique_id) {
                    // Condition
                    const orderStatusCondition = {
                        order_id: result.order_unique_id,
                        // status_name: order_status_name['PHLEBO_STARTED']
                    };
                    const options = {
                        sort: { created_date_time: -1 }
                    };
                    const projection = { map_link: 1 };
                    const orderStatus = yield orderService_1.orderService.getOrderStatus(orderStatusCondition, projection, options);
                    // log.info('Order Status result', JSON.stringify(orderStatus));
                    if (!_.isEmpty(orderStatus)) {
                        result.map_link = (orderStatus.map_link) ? orderStatus.map_link : "";
                    }
                }
                return response_1.response.send(req, res, result, 'SUCCESS');
            }
            catch (err) {
                return response_1.response.error(req, res, { message: err }, 'SOME-THING-WENT-WRONG');
            }
        });
    }
}
exports.orderController = new OrderController();
