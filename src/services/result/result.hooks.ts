import { HooksObject, HookContext } from '@feathersjs/feathers';
import  {validateResult}  from './result.joi';

const hooks: HooksObject = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateResult], // Add the validation hook to the 'create' method
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

export default hooks;
