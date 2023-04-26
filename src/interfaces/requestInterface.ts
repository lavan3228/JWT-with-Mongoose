import { Request } from 'express';

export interface RequestData extends Request {
    userId: number;
    projectId: number;
    userRole: string[];
    startTime?: number;
    formedUrl?: string;
    jti?: string;
}
