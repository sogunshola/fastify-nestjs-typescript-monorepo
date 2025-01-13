export declare class ResponseDTO<T> {
    status: boolean | undefined;
    message: string | undefined;
    data: T | undefined;
}
export declare class PaginatedResponseDTO<T> {
    status: boolean | undefined;
    message: string | undefined;
    data: T[] | undefined;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pageCount: number;
        skipped: number;
        nextPage: boolean;
    } | undefined;
}
//# sourceMappingURL=response.d.ts.map