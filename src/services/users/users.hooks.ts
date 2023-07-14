import { authenticate } from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { validateUser, validateUserData, validateUserPatch } from './users.joi';
import { BadRequest } from '@feathersjs/errors';
import  validate  from 'sequelize-typescript';

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
   create: [
      
      (context: HookContext) => {
        const { data } = context;
  
        // Perform validation using validate.form
        const { error } = validate.form(data, validateUserData);
  
        if (error) {
          throw new BadRequest(error.details[0].message);
        }
  
        return context;
      },
    ],
    update: [
      authenticate('jwt'),
      validateUserPatch, // Add the validateUserPatch function here
    ],
    patch: [
      (context: HookContext) => {
        const { data } = context;
  
        // Perform validation using validate.form
        const { error } = validate.form(data, validateUserPatch);
  
        if (error) {
          throw new BadRequest(error.details[0].message);
        }
  
        return context;
      },
    ],
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

