import { authenticate } from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import {  validateUser,
  validateUserData,
  validateUserPatch,
  getUserSchema,
  joiOptions,
joiReadOptions } from './users.joi';
import { BadRequest } from '@feathersjs/errors';
import  validate  from 'sequelize-typescript';

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), validate.form(getUserSchema,joiReadOptions,)], // Use validate.form with joiReadOptions for the find hook
    get: [authenticate('jwt'), validate.form(getUserSchema,joiReadOptions)],
   create: [
      
      (context: HookContext) => {
        const { data } = context;
  
        // Perform validation using validate.form
        const { error } = validate.form(data, validateUserData,joiOptions);
  
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

