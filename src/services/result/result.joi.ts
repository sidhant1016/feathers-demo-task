import Joi from "joi"
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

const resultSchema = Joi.object({
  id: Joi.number().integer().required(),
    student_id: Joi.number().integer().required(),
    subject: Joi.string().required(),
    marks: Joi.number().integer().required(),
  });

 export  const validateResult = (context: HookContext) => {
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