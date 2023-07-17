import { authenticate } from "@feathersjs/authentication";
import { HookContext } from "@feathersjs/feathers";
import {
  validateUserData,
  validateUserPatch,
  getUserSchema,
  joiOptions,
  joiReadOptions,
} from "./users.joi";
import validate from "sequelize-typescript";


export default {
  before: {
    all: [],
    find: [authenticate("jwt"), validate.form(getUserSchema, joiReadOptions)],
    get: [authenticate("jwt"), validate.form(getUserSchema, joiReadOptions)],
    create: [validate.form(validateUserData, joiOptions)],
    update: [
      authenticate("jwt"),
      validateUserPatch, 
    ],
    patch: [validate.form(validateUserPatch, joiReadOptions)],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
