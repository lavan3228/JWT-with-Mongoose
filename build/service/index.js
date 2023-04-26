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
exports.Index = void 0;
// const log = common.loggerFactory.getLogger('Index');
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
        /**
         * Find data based on populate
         * @param  {} dataModel
         * @param  {} condition
         */
        this.populate = (dataModel, condition, patient, test) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataModel.findOne(condition).populate(patient, 'phone_number relation_type first_name last_name gender email patient_unique_id').populate(test);
            return data;
        });
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
    // deleteMany(dataModel, condition) {
    //     return new Promise((resolve, reject) => {
    //         return dataModel.deleteMany(condition)
    //             .then((result) => {
    //                 return resolve(result);
    //             })
    //             .catch((err) => {
    //                 return reject(err);
    //             });
    //     });
    // }
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
}
exports.Index = Index;
