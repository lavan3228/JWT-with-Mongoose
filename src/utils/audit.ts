class Audit {
    /**
     * Send error response
     * @param  { request } req
     * @param  { result } result
     * @param  { errorFlag } true default:false
     * @param  { source } 'From which service Ex :Master/Order/Patient ...'
     */
    async createObject(req, result, errorFlag: false, source) {
        const saveResponse = {
            request_time: req['request_time'],
            response_time: Date.now(),
            duration: Date.now() - req['request_time'],
            source: req.headers['x-source'],
            service: source,
            http_method: req.method,
            response: JSON.stringify(result),
            user_id: req.user_id,
            request_url: req.originalUrl,
            error: errorFlag,
            device_type: req.headers['x-device-type'],
            app_id: req.headers['x-app-id'],
            app_version: req.headers['x-app-version']
        };
        req.method === 'GET' ? saveResponse['request'] = JSON.stringify(req.query) : saveResponse['request'] = JSON.stringify(req.body);
        return saveResponse;
    }
}

export const audit = new Audit();
