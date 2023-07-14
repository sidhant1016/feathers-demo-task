"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_class_1 = require("./users.class");
const users_model_1 = __importDefault(require("../../models/users.model"));
const users_hooks_1 = __importDefault(require("./users.hooks"));
const users_joi_1 = __importDefault(require("./users.joi"));
const errors_1 = require("@feathersjs/errors");
function default_1(app) {
    const options = {
        Model: users_model_1.default(app),
        paginate: app.get('paginate')
    };
    class UsersService extends users_class_1.Users {
        async create(data, params) {
            const { error } = users_joi_1.default.validate(data);
            if (error) {
                throw new errors_1.BadRequest(error.details[0].message);
            }
            return super.create(data, params);
        }
    }
    // Initialize our service with any options it requires
    app.use('/users', new UsersService(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('users');
    service.hooks(users_hooks_1.default);
}
exports.default = default_1;
