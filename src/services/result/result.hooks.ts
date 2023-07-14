import { authenticate } from '@feathersjs/authentication';

import { validateResult, validateResultData, validateResultPatch } from './result.joi';


export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validateResult],
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