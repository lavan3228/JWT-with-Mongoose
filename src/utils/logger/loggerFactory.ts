import { logger } from './logger';

// 
class LoggerFactory {

    /** 
     * Get logger function instance
     */
    getLogger(className: any) {
        return new logger(className)
    }
}

export const loggerFactory = new LoggerFactory();
