"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_joi_1 = require("./result.joi");
const hooks = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [result_joi_1.validateResult],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
exports.default = hooks;
