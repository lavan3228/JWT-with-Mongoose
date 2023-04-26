import moment from 'moment';

class TimeValidationHelper {

    /**
     * Checking time difference between 2 times  
     */
    isValidTime = async (from_time: any, to_time: any) => {
        try {
            const currentDate: any = moment().format('YYYY-MM-DD');
            const startDate: any = new Date(`${currentDate} ${from_time}`);
            const endDate: any = new Date(`${currentDate} ${to_time}`);
            const differenceInMilliseconds = (endDate - startDate);

            return (differenceInMilliseconds <= 0) ? { status: false } : { status: true };

        } catch (err: any) {
            return { status: false, message: err.message };
        }
    }

}

export const timeValidationHelper = new TimeValidationHelper();
