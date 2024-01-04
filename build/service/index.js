'use strict';
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
exports.Index = void 0;
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('Index');
class Index {
    constructor() {
        this.findOneAndUpdate = (dataModel, condition, data) => {
            return new Promise((resolve, reject) => {
                return dataModel.findOneAndUpdate(condition, data, { new: true })
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    return reject(err);
                });
            });
        };
        this.findOneAndUpdateUpsert = (dataModel, condition, data) => {
            return new Promise((resolve, reject) => {
                return dataModel.findOneAndUpdate(condition, data, { new: true, upsert: true })
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    return reject(err);
                });
            });
        };
        this.findOneAndUpdateUpserts = (dataModel, data, condition) => {
            return new Promise((resolve, reject) => {
                return dataModel.findOneAndUpdate(condition, data, { new: true, upsert: true })
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    return reject(err);
                });
            });
        };
        /**
         * Find data based on populate
         * @param  {} dataModel
         * @param  {} condition
         */
        this.populate = (dataModel, condition, patient, test) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataModel.findOne(condition).populate(patient, 'phone_number relation_type first_name last_name gender email patient_unique_id').populate(test);
            return data;
        });
        /**
         * Find single data based on populate
         * @param  {} dataModel
         * @param  {} condition
         */
        this.findOnePopulate = (dataModel, condition, patient) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataModel.findOne(condition).populate(patient);
            return data;
        });
        /**
         * Find single data based on populate and options
         * @param  {} dataModel
         * @param  {} condition
         */
        this.findOnePopulateWithOptions = (dataModel, condition, projection = {}, options = {}, populateObj) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataModel.findOne(condition, projection, options).populate(populateObj);
            return data;
        });
        /**
         * Find data based on populate
         * @param  {} dataModel
         * @param  {} condition
         */
        this.findAllPopulate = (dataModel, condition, projection = {}, options = {}, populateModel) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataModel.find(condition, projection, options).populate(populateModel);
            return data;
        });
        this.populateMethod = (dataModel, condition, populateId) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataModel.findOne(condition).populate(populateId);
            return data;
        });
        /**
         * Find data based on single populate
         * @param  {} dataModel
         * @param  {} condition
         */
        this.findWithPopulate = (dataModel, condition, projection, options = {}, populateObj) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return dataModel.find(condition, projection, options).populate(populateObj)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    // log.error('service populate', err);
                    return reject(err);
                });
            });
        });
        /**
         * Find data based on multiple populate
         * @param  {} dataModel
         * @param  {} condition
         */
        this.multiPopulate = (dataModel, condition, projection = {}, options, populateObj1, populateObj2, populateObj3) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return dataModel.find(condition, projection, options).populate(populateObj1).populate(populateObj2).populate(populateObj3)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    // log.error('service multiPopulate', err);
                    return reject(err);
                });
            });
        });
        /**
         * Find with two populate
         */
        this.findWithTwoPopulate = (dataModel, condition, projection = {}, options, populateObj1, populateObj2) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return dataModel.find(condition, projection, options).populate(populateObj1).populate(populateObj2)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    // log.error('service multiPopulate', err);
                    return reject(err);
                });
            });
        });
    }
    /**
     * Find one
     * @param  {} dataModel
     * @param  {} condition
     */
    findOne(dataModel, condition, projection = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.findOne(condition, projection)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Delete one
     * @param  {} dataModel
     * @param  {} condition
     */
    deleteOne(dataModel, condition, projection = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.deleteOne(condition, projection)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Insert data
     * @param  {} dataModel
     * @param  {} data
     */
    create(dataModel, data) {
        return new Promise((resolve, reject) => {
            return dataModel.create(data)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Bulk insert data
     * @param  {} dataModel
     * @param  {} data
     */
    bulkInsert(dataModel, data) {
        return new Promise((resolve, reject) => {
            return dataModel.insertMany(data)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    deleteMany(dataModel, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.deleteMany(condition)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    updateMany(dataModel, condition, data) {
        return new Promise((resolve, reject) => {
            return dataModel.updateMany(condition, data)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    updateOne(dataModel, condition, data) {
        return new Promise((resolve, reject) => {
            return dataModel.updateOne(condition, data)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Get count
     * @param  {} dataModel
     * @param  {} condition
     */
    count(dataModel, condition = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.count(condition)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Find one
     * @param  {} dataModel
     * @param  {} condition
     */
    findOneWithOptions(dataModel, condition, projection = {}, options = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.findOne(condition, projection, options)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Find one
     * @param  {} dataModel
     * @param  {} condition
     */
    findOneWithCollation(dataModel, condition, projection = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.findOne(condition, projection).collation({ locale: 'en', strength: 2 })
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Find all data
     * @param  {} dataModel
     * @param  {} condition
     */
    findAll(dataModel, condition, query = {}) {
        return new Promise((resolve, reject) => {
            if (Object.keys(query).length > 0) {
                return dataModel.find(condition, {}, query)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    return reject(err);
                });
            }
            else {
                return dataModel.find(condition)
                    .then((result) => {
                    return resolve(result);
                })
                    .catch((err) => {
                    return reject(err);
                });
            }
        });
    }
    find(dataModel, condition, projection = {}, options = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.find(condition, projection, options)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    mongoFindAll(dataModel, condition, projection = {}, options = {}) {
        return new Promise((resolve, reject) => {
            return dataModel.find(condition, projection, options)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Find aggregate
     * @param {} dataModel
     * @param {} condition
     */
    aggregate(dataModel, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.aggregate(condition)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Update single data
     * @param  {} dataModel
     * @param  {} data
     * @param  {} condition
     */
    update(dataModel, data, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.update(data, condition)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                if (condition && condition.transaction) {
                    condition.transaction.rollback();
                    // log.error('Index.update: catch inside transaction'); 
                }
                return reject(err);
            });
        });
    }
    /**
     * Replace mis data when update
     */
    findOneAndReplace(dataModel, condition, data) {
        return new Promise((resolve, reject) => {
            return dataModel.findOneAndReplace(condition, data, { returnNewDocument: true })
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Bulk insert data
     * @param  {} dataModel
     * @param  {} data
     */
    mongoBulkInsert(dataModel, data) {
        return new Promise((resolve, reject) => {
            return dataModel.insertMany(data)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    /**
     * Find data
     * @param  {} dataModel
     * @param  {} condition
     * @param  {} projection
     */
    leanFindProjection(dataModel, condition, projection) {
        return new Promise((resolve, reject) => {
            return dataModel.find(condition, projection).lean()
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    // /**
    //  * Mysql count records
    //  * @param {} dataModel
    //  * @param {} condition
    //  */
    // mysqlupdate(dataModel, data, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.update(data, condition)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    // /**
    //  * Bulk insert data
    //  * @param  {} dataModel
    //  * @param  {} data
    //  */
    // mySqlbulkInsert(dataModel, data, options) {
    //     const optionsObj = _.isEmpty(options) ? { returning: true } : options;
    //     return new Promise((resolve, reject) => {
    //         return dataModel.bulkCreate(data, optionsObj)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 // if (options && options.transaction) { 
    //                 //     options.transaction.rollback(); 
    //                 //     log.error('Index.mySqlBulkInsert: catch inside transaction'); 
    //                 // }
    //                 return reject(err);
    //             });
    //     });
    // }
    // mysqlCount(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.count(condition)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    // mysqlFindOne(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.findOne(condition)
    //             .then((result: any) => {
    //                 return resolve((result || {}).dataValues);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    // mysqlFindOneNew(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.findOne(condition)
    //             .then((result: any) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    // /**
    //  * Increment field
    //  * @param  {} increment_decrement_fields
    //  * @param  {} condition
    //  */
    // mysqlIncrement(dataModel, increment_decrement_fields, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.increment(increment_decrement_fields, condition)
    //             .then((result: any) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 // if (condition && condition.transaction) { 
    //                 //     condition.transaction.rollback(); 
    //                 //     log.error('Index.mysqlIncrement: catch inside transaction'); 
    //                 // }
    //                 return reject(err);
    //             });
    //     });
    // }
    // /**
    //  * Find all data
    //  * @param  {} dataModel
    //  * @param  {} condition
    //  */
    // mySqlfindAll(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.findAll(condition)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    // mysqlFindAll(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.findAll(condition)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    // /**
    //  * Find all data
    //  * @param  {} dataModel
    //  * @param  {} condition
    //  */
    // mysqlFindAllNew(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.findAll(condition)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
    /**
     * Note: Only for mongo DB
     * update data
     * @param dataModel
     * @param data
     * @param condition
     * @returns
     */
    mongoUpdate(dataModel, data, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.updateOne(data, condition)
                .then((result) => {
                return resolve(result);
            })
                .catch((err) => {
                // if (condition && condition.transaction) {
                //     condition.transaction.rollback();
                //     log.error('Index.update: catch inside transaction');
                // }
                return reject(err);
            });
        });
    }
}
exports.Index = Index;
