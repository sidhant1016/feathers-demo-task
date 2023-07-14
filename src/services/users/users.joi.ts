import Joi from 'joi';
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export  const validateUser = (context: HookContext) => {
  const { data } = context;

  const { error } = UserSchema.validate(data);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  return context;
};

export default UserSchema;
