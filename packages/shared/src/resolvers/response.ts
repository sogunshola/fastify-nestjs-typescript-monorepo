
export class ResponseDTO<T> {
  status: boolean | undefined;

  message: string | undefined;

  data: T | undefined;
}

export class PaginatedResponseDTO<T> {
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
