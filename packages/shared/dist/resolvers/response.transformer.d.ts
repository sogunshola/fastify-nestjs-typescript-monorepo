import { ResponseDTO, PaginatedResponseDTO } from './response';
export declare function sendObjectResponse<T>(data: T, message: string): ResponseDTO<T>;
export declare function sendPaginatedListResponse<T>(response: {
    list: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pageCount: number;
        skipped: number;
        nextPage: boolean;
    };
}, message: string): PaginatedResponseDTO<T>;
export declare function sendListResponse<T>(data: T[], message: string): {
    status: boolean;
    message: string;
    data: T[];
};
//# sourceMappingURL=response.transformer.d.ts.map