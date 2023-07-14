"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("@feathersjs/errors");
const UserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.validateUser = (context) => {
    const { data } = context;
    const { error } = UserSchema.validate(data);
    if (error) {
        throw new errors_1.BadRequest(error.details[0].message);
    }
    return context;
};
exports.default = UserSchema;
