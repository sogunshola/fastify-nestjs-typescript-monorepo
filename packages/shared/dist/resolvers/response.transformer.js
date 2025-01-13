"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendObjectResponse = sendObjectResponse;
exports.sendPaginatedListResponse = sendPaginatedListResponse;
exports.sendListResponse = sendListResponse;
function sendObjectResponse(data, message) {
    return {
        status: true,
        message,
        data,
    };
}
function sendPaginatedListResponse(response, message) {
    return {
        status: true,
        message,
        data: response.list,
        pagination: response.pagination,
    };
}
function sendListResponse(data, message) {
    return {
        status: true,
        message,
        data,
    };
}
