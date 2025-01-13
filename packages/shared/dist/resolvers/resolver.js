"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveResponse = resolveResponse;
const response_transformer_1 = require("./response.transformer");
async function resolveResponse(service, message = 'Success') {
    const response = await service;
    if (Array.isArray(response)) {
        return (0, response_transformer_1.sendListResponse)(response, message);
    }
    if (isPaginatedResponse(response)) {
        return (0, response_transformer_1.sendPaginatedListResponse)(response, message);
    }
    return (0, response_transformer_1.sendObjectResponse)(response, message);
}
function isPaginatedResponse(response) {
    return response !== null && typeof response === 'object' && 'list' in response && 'pagination' in response;
}
