"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResult = void 0;
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("@feathersjs/errors");
const resultSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    student_id: joi_1.default.number().integer().required(),
    subject: joi_1.default.string().required(),
    marks: joi_1.default.number().integer().required(),
});
exports.validateResult = (context) => {
    const { data } = context;
    const { error } = resultSchema.validate(data);
    if (error) {
        throw new errors_1.BadRequest(error.details[0].message);
    }
    return context;
};
exports.default = resultSchema;
