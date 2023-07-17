import { authenticate } from '@feathersjs/authentication';

import { validateResult, validateResultData, validateResultPatch,joiOptions,joiReadOptions,getResultSchema } from './result.joi';


export default {
  before: {
    all: [],
    find: [authenticate('jwt'),getResultSchema,joiReadOptions],
    get: [authenticate('jwt'),getResultSchema,joiReadOptions],
    create: [validateResult,joiOptions],
    update: [validateResultData],
    patch: [validateResultPatch],
    remove: [authenticate('jwt')],
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
}