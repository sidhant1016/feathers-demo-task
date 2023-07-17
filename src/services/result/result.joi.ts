import Joi from "joi";
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

const resultSchema = Joi.object({
  id: Joi.number().integer().required(),
  student_id: Joi.number().integer().required(),
  subject: Joi.string().required(),
  marks: Joi.number().integer().required(),
});

export const joiOptions = { convert: true, abortEarly: false };

export const getResultSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  subject: Joi.string().required(),
  marks: Joi.number().integer().required(),
});

export const joiReadOptions = {
  getContext(context: any) {
    // For example, if you want to get data from the 'query' object in Feathers
    return context.params?.query || {};
  },
  setContext(context: any, newValues: any) {
    // For example, if you want to assign new values to the 'query' object in Feathers
    Object.assign(context.params, { query: { ...context.params.query, ...newValues } });
  },
};

export const validateResult = (context: HookContext) => {
  const { data } = context;
  const { error } = resultSchema.validate(data);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  return context;
};

export const validateResultData = (context: HookContext) => {
  const { data } = context;
  const { error } = resultSchema.validate(data);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  return context;
};

export const validateResultPatch = (context: HookContext) => {
  const { data } = context;
  const { error } = resultSchema.validate(data, { allowUnknown: true });
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  return context;
};

export default resultSchema;
