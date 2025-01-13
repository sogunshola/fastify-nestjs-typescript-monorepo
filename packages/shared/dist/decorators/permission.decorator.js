"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsePermissions = void 0;
const common_1 = require("@nestjs/common");
const UsePermissions = (...permissions) => (0, common_1.SetMetadata)('permissions', permissions);
exports.UsePermissions = UsePermissions;
