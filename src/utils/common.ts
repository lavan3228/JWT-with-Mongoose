import * as mongoose from 'mongoose';
import * as request from 'request';
import { orderService } from '../service/orderService';
import { languages } from '../languages';
import * as Url from 'url-parse';
import moment from 'moment';
import { log } from 'console';
const trackSecret = process.env.TRACK_SERCRET_KEY;

// import sha256 from 'crypto-js/sha256';
// import { commonService } from '../service/commonService';

class Common {

    /**
     * Checking valid mongo id or not
     * @id
     */
    isMongoObjectId = async (id) => {
        console.log("f544", id);
        // console.log(mongoose.Schema.Types.ObjectId, "fnhfj");
        // return 
        if (mongoose.Types.ObjectId.isValid(id))
            return true;
        else
            return false;
    }

    requestAPI = (method: string, url: string, data: any, headers = {}) => {
        return new Promise((resolve, reject) => {

            const options: any = {};
            options['method'] = method;
            options['uri'] = url;
            options['headers'] = headers;
            options['json'] = true;

            if (method === 'POST' || method === 'PUT') {
                options['body'] = data;
            }

            request(options, (error, response, body) => {
                if (error) reject(error);
                resolve(response.body);
            });
        });
    }

    headers = () => {
        const header = { 'Content-Type': 'application/json', 'Token': 'bc4ea4ab-0851-5aad-9d92-a796ea635b4f' };
        return header;
    }

    /**
     * To generate unique id
     */
    generateUniqueId(input) {
        const uid = input + (new Date()).getTime() + '' + Math.trunc(365 * Math.random());
        return uid;
    }


    /**
     * To check valid payload
     * @payload
     */
    checkPayloadAttributes = async (payload) => {

        if ((payload !== undefined) && ("attributes" in payload) && (Object.keys(payload.attributes).length > 0))
            return true;
        else
            return false;
    }

    /**
     * To get milli seconds
     */
    getMilliseconds() {
        return new Date().getTime();
    }

    /**
     * To check request value is valid or not
     * @val
     */
    isValid = (val) => {
        if (val !== undefined && val !== null && val !== "")
            return true;
        else
            return false;
    }

    /**
     * Split message and template id
     */
    splitMessageAndTemplateId = async (message) => {
        let templateId: any = "";
        let messageContent: any = "";
        const splitMessage: any = message.split("###");

        // Message content
        if (splitMessage[0] !== undefined && splitMessage[0] !== null && splitMessage[0] !== "")
            messageContent = splitMessage[0];

        // Template Id
        if (splitMessage[1] !== undefined && splitMessage[1] !== null && splitMessage[1] !== "")
            templateId = splitMessage[1];

        return { message_content: messageContent, template_id: templateId };

    }

    /**
     * To check object is valid or not
     * @obj
     */
    isObject = (obj) => {
        if (obj !== undefined && obj !== null && Object.keys(obj).length > 0)
            return true;
        else
            return false;
    }

    distance = (sourceLat, sourceLong, targetLat, targetLong, unit) => {
        return new Promise(async (resolve, reject) => {
            if ((sourceLat === targetLat) && (sourceLong === targetLong)) {
                resolve(0);
            }
            else {
                const radlat1 = Math.PI * sourceLat / 180;
                const radlat2 = Math.PI * targetLat / 180;
                const theta = sourceLong - targetLong;
                const radtheta = Math.PI * theta / 180;
                let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515; // 'M' is statute miles (default)
                if (unit === "K") { dist = dist * 1.609344 } // 'K' is kilometers
                if (unit === "N") { dist = dist * 0.8684 } // 'N' is nautical miles 
                resolve(dist);
            }
        });
    }


    getUrlPath = (reqUrl) => {
        const url = Url(reqUrl, true);
        return url.pathname;
    }


    // generateHash(base64_key) {
    //     base64_key += trackSecret;
    //     const sha = sha256(base64_key).toString();
    //     return sha;
    // }

    addMinsTo24HrsTime(time, durationInMins) {
        return moment(time, 'HH:mm').add(durationInMins, 'minutes').format('HH:mm')
    }

    getTimeDiffInSeconds(endDate, startDate) {
        let seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
        return seconds;
    }

    /**
     * Difference between dates
     * @param fromDate 
     * @param toDate 
     * @param dateRange 
     */
    differenceInTwoDates = async (fromDate, toDate, dateRange) => {
        try {
            const startDate = moment(fromDate, 'YYYY-MM-DD');
            const endDate = moment(toDate, 'YYYY-MM-DD');
            const diff = endDate.diff(startDate, 'days');

            if (diff < dateRange)
                return true;
            else
                return false;
        } catch (err) {
            // log.error("error in catch common:differenceInTwoDates", err);
            return false;
        }
    }

    /**
     * method to get patient full name
     * @param firstName 
     * @param middleName 
     * @param LastName 
     */
    getPatienFullName = async (firstName, middleName, LastName) => {
        let patientName: any = '';
        if (this.isValid(firstName)) {
            patientName = patientName + firstName + ' ';
        }
        if (this.isValid(middleName)) {
            patientName = patientName + middleName + ' ';
        }
        if (this.isValid(LastName)) {
            patientName = patientName + LastName;
        }
        patientName = patientName.trim();
        return patientName;
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

    // isMongoObjectId = async (id) => {
    //     if (mongoose.Types.ObjectId.isValid(id)) 
    //         return true;
    //     else
    //         return false;
    // }


    // checkEcommSource = (ecomSource) => {
    //     if (Number(ecomSource) === Number(sourceKeysEnum['ECOMMERCE']))   // 10 is the E-comm source
    //         return true;

    //     return false;
    // }

    

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
    utcIst = (date) => {
        const dateUTC = new Date(date);
        const dateUtcTime = dateUTC.getTime()
        let dateIST = new Date(dateUtcTime);
        //date shifting for IST timezone (+5 hours and 30 minutes)
        dateIST.setHours(dateIST.getHours() + 5);
        dateIST.setMinutes(dateIST.getMinutes() + 30);
        return dateIST;
    }
    

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


    sendMail = async (statCode, reqObj, apiResult) => {
        const toMail = process.env.MAIL;
        const sub = `- Error in Internal Order  API`;
        const emailMsg = `<html><head></head><body>
                        Hello Team, <br /><br />
    
                        Getting below error in Internal Order  API while making online payment. So, Please check it once. <br /><br />
    
                        <b>Below are the details: </b> <br /><br />
    
                        <b>Status Code</b>: ${statCode}, <br /><br />
                        <b>Request Payload: </b>: ${JSON.stringify(reqObj)}, <br /><br />
                        <b>Response</b>: ${JSON.stringify(apiResult)}, <br /><br />
                        
                        <b>Thanks & Regards</b> <br />
                        Lalpath Team
                        </body><html/>` ;

        
        // const mailResponse: any = await mail.send(toMail, sub, emailMsg, dataAreaId);
        // log.info({ jsonObject: mailResponse, description: 'Mail Response-Internal Order Payment API' });

        // return mailResponse;
    }


}

export const common = new Common();
