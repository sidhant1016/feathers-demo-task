"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
const result_class_1 = require("./result.class");
const result_model_1 = __importDefault(require("../../models/result.model"));
const result_hooks_1 = __importDefault(require("./result.hooks"));
const result_joi_1 = __importDefault(require("./result.joi"));
function default_1(app) {
    const options = {
        Model: result_model_1.default(app),
        paginate: app.get('paginate')
    };
    class ResultService extends result_class_1.Result {
        async create(data, params) {
            const { error } = result_joi_1.default.validate(data);
            if (error) {
                throw new errors_1.BadRequest(error.details[0].message);
            }
            return super.create(data, params);
        }
    }
    // Initialize our service with any options it requires
    app.use('/result', new ResultService(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('result');
    service.hooks(result_hooks_1.default);
}
exports.default = default_1;
