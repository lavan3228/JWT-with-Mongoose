"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
class Common {
    constructor() {
        this.isValid = (val) => {
            if (val !== undefined && val !== null && val !== "")
                return true;
            else
                return false;
        };
        this.isObject = (obj) => {
            if (obj !== undefined && obj !== null && Object.keys(obj).length > 0)
                return true;
            else
                return false;
        };
        // isMongoObjectId = async (id) => {
        //     if (mongoose.Types.ObjectId.isValid(id)) 
        //         return true;
        //     else
        //         return false;
        // }
        this.requestAPI = (method, url, data, headers = {}) => {
            return new Promise((resolve, reject) => {
                const options = {};
                options['method'] = method;
                options['uri'] = url;
                options['headers'] = headers;
                options['json'] = true;
                if (method === 'POST' || method === 'PUT') {
                    options['body'] = data;
                }
                // request(options, (error, response, body) => {
                //     if (error) reject(error);
                //     resolve(response.body);
                // });
            });
        };
        this.headers = () => {
            const header = { 'Content-Type': 'application/json', 'Token': 'bc4ea4ab-0851-5aad-9d92-a796ea635b4f' };
            return header;
        };
        // checkEcommSource = (ecomSource) => {
        //     if (Number(ecomSource) === Number(sourceKeysEnum['ECOMMERCE']))   // 10 is the E-comm source
        //         return true;
        //     return false;
        // }
        this.checkPayloadAttributes = (payload) => {
            if ("attributes" in payload) {
                if (payload !== undefined && payload !== null && (Object.keys(payload.attributes).length > 0))
                    return true;
                else
                    return false;
            }
            else
                return false;
        };
        // isValid = (val) => {
        //     if (val !== undefined && val !== null && val !== "")
        //         return true;
        //     else
        //         return false;
        // }
        // isObject = (obj) => {
        //     if (obj !== undefined && obj !== null && Object.keys(obj).length > 0)
        //         return true;
        //     else
        //         return false;
        // }
        /**
         * Method which converst UTC date to IST
         * @param date
         * @returns
         */
        this.utcIst = (date) => {
            const dateUTC = new Date(date);
            const dateUtcTime = dateUTC.getTime();
            let dateIST = new Date(dateUtcTime);
            //date shifting for IST timezone (+5 hours and 30 minutes)
            dateIST.setHours(dateIST.getHours() + 5);
            dateIST.setMinutes(dateIST.getMinutes() + 30);
            return dateIST;
        };
        /**
         * Difference between dates
         * @param fromDate
         * @param toDate
         * @param dateRange
         */
        // differenceInTwoDates = async (fromDate, toDate, dateRange) => {
        //     try {
        //         const startDate = moment(fromDate, 'YYYY-MM-DD');
        //         const endDate = moment(toDate, 'YYYY-MM-DD');
        //         const diff = endDate.diff(startDate, 'days');
        //         return diff < dateRange ? true : false;
        //     } catch (err) {
        //         return false;
        //     }
        // }
        /**
         * To parse the url
         * @param reqUrl
         * @returns
         */
        // getUrlPath = (reqUrl) => {
        //     const url = Url(reqUrl, true);
        //     return url.pathname;
        // }
        /**
         * Uploading file to s3 bucket
         * @param fileName
         * @param files
         * @param filePath
         * @returns
         */
        //  uploadFileToS3(fileName, files, filePath) {
        //     try {
        //         return new Promise(async (resolve, reject) => {
        //             log.info(`AWS ${fileName} uploadFileToS3:`, JSON.stringify(config));
        //             const readStream = fs.createReadStream(files);
        //             const client = credentials;
        //             const writeStream = client.upload({
        //                 container: process.env.PNP_BUCKET_COMMON, // Bucket name
        //                 remote: fileName, // file.originalFilename
        //                 acl: 'private'
        //             });
        //             await writeStream.on('error', (wsErr) => {
        //                 log.error('Error in upload', wsErr);
        //                 if (filePath && fs.existsSync(filePath)) {
        //                     fs.unlinkSync(filePath);
        //                 }
        //                 return resolve({ isUploaded: false });
        //             });
        //             await writeStream.on('success', (file) => {
        //                 log.info('File Remove', files);
        //                 if (filePath && fs.existsSync(filePath)) {
        //                     fs.unlinkSync(filePath);
        //                 }
        //                 resolve({ isUploaded: true, file });
        //             });
        //             readStream.pipe(writeStream);
        //         });
        //     } catch (error) {
        //         const errorInfo = {
        //             jsonObject: error,
        //             description: 'Error In uploadFileToS3 - FileUploadService'
        //         };
        //         log.error(errorInfo);
        //         if (filePath && fs.existsSync(filePath)) {
        //             fs.unlinkSync(filePath);
        //         }
        //         return { isUploaded: false, message: 'SERVER-ERROR' };
        //     }
        // }
    }
    /**
     * Returns the current unix timestamp
     */
    epochTime() {
        return (Math.round(new Date().getTime() / 1000));
    }
    removeWhiteSpaces(text) {
        if (text !== undefined)
            return (text.replace(/\s+/gm, ''));
        else {
            return text;
        }
    }
    /**
     * Convert to int
     * @param  {} values
     */
    convert(value) {
        return value !== undefined ? parseInt(value, 10) : undefined;
    }
    /**
     * Convert environment variable to string
     * @param  {} values
     */
    converted(value) {
        return value === undefined ? '' : value;
    }
    generateUniqueId(input) {
        const uid = input + (new Date()).getTime() + '' + Math.trunc(365 * Math.random());
        return uid;
    }
}
exports.common = new Common();
