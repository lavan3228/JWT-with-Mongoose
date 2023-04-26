import { response } from '../utils/response';

class Pagination {

   validate(req: any, res: any, next: any) {
       const page = (req.query.page !== undefined) ? Number(req.query.page) : 1;
       const size = (req.query.size !== undefined) ? Number(req.query.size) : Number(process.env.PAGINATION_SIZE);

       // Checking page number
       if (page < 0 || page === 0) {
           return response.error(req, res, '', 'INVALID-PAGE-NUMBER');
       }

       // Checking size number
       if (size < 0 || size === 0) {
           return response.error(req, res, '', 'INVALID-SIZE-NUMBER');
       }

       req.query.page = page;
       req.query.size = size;

       next();        
   }

}

export const pagination = new Pagination();  
