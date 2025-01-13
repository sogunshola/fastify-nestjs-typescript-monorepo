interface PaginatedServiceReturnType<T> {
    list: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pageCount: number;
        skipped: number;
        nextPage: boolean;
    };
}
export declare function resolveResponse<T>(service: Promise<T[] | PaginatedServiceReturnType<T> | T>, message?: string): Promise<{
    status: boolean;
    message: string;
    data: T[];
} | import("./response").PaginatedResponseDTO<T> | import("./response").ResponseDTO<T>>;
export {};
//# sourceMappingURL=resolver.d.ts.map