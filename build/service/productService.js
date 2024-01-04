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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_1 = require("../models/product");
const index_1 = require("./index");
class ProductService extends index_1.Index {
    constructor() {
        super(...arguments);
        this.find = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(product_1.productModel, condition);
        });
        this.save = (record) => __awaiter(this, void 0, void 0, function* () {
            return yield this.create(product_1.productModel, record);
        });
        this.update = (whereCondition, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.updateOne(product_1.productModel, whereCondition, updateData);
        });
        this.findAll = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.mongoFindAll(product_1.productModel, condition);
        });
        //  To get payment details
        this.findPayment = (condition) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOne(product_1.productModel, condition);
            return result;
        });
        // To update task details
        this.findAndUpdateTask = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdate(product_1.productModel, condition, data);
            return result;
        });
        // To Update order status
        this.saveOrderStatus = (orderResult, statusCode, statusName) => __awaiter(this, void 0, void 0, function* () {
            const statusData = {
                order_id: orderResult.order_unique_id,
                booking_date: orderResult.created_date_time,
                status_code: statusCode,
                status_name: statusName, // Ex: Booked
                // created_at: moment().format()
            };
            const result = yield this.create(product_1.productModel, statusData);
            return result;
        });
        // Update patient detail if already exist otherwise save the patient details
        this.patientFindOneAndUpdateUpsert = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdateUpsert(product_1.productModel, condition, data);
            return result;
        });
    }
}
exports.productService = new ProductService();
