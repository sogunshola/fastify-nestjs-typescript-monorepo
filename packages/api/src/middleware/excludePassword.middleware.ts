import { Prisma } from '@prisma/client';

export function excludePasswordMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    // Proceed with the query and get the result
    const result = await next(params);

    if (params.action === 'findUnique') {
      return result;
    }

    // Helper function to exclude password
    const excludePassword = (data: any) => {
      if (data && typeof data === 'object' && 'password' in data) {
        delete data.password;
        return data;
      }
      return data;
    };

    // Check if the result is an array, object, or null
    if (Array.isArray(result)) {
      return result.map(excludePassword);
    } else if (result) {
      return excludePassword(result);
    }

    return result;
  };
}
