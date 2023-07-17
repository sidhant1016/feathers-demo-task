import Joi, { ValidationResult } from 'joi';
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

 export const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
 export const joiOptions = { convert: true, abortEarly: false };

export const getUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  isAdmin: Joi.boolean().optional(),
});


export const joiReadOptions = {
  getContext(context:any) {
    // For example, if you want to get data from the 'query' object in Feathers
    return context.params?.query || {};
  },
  setContext(context:any, newValues:any) {
    // For example, if you want to assign new values to the 'query' object in Feathers
    Object.assign(context.params, { query: { ...context.params.query, ...newValues } });
  },
};

export const validateUser = (context: HookContext) => {
  const { data } = context;
  const { error }: ValidationResult = UserSchema.validate(data, joiReadOptions.getContext(context));

  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  return context;
};

export const validateUserData = (context: HookContext) => {
  const { data } = context;
  const { error }: ValidationResult = UserSchema.validate(data, joiReadOptions.getContext(context));

  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  return context;
};

export const validateUserPatch = (context: HookContext) => {
  const { data } = context;
  const { error }: ValidationResult = UserSchema.validate(data, {
    ...joiReadOptions.getContext(context),
    allowUnknown: true,
  });

  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  return context;
};



export default {
  validateUser,
  validateUserData,
  validateUserPatch,
  getUserSchema,
  joiOptions,
  joiReadOptions
};