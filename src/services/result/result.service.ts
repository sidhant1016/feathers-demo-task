import Joi from 'joi';
import { BadRequest } from '@feathersjs/errors';
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Result } from './result.class';
import createModel from '../../models/result.model';
import hooks from './result.hooks';
import resultSchema from './result.joi';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'result': Result & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  class ResultService extends Result {
    async create(data: any, params: any) {
      const { error } = resultSchema.validate(data);

      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      return super.create(data, params);
    }
  }

  // Initialize our service with any options it requires
  app.use('/result', new ResultService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('result');
  service.hooks(hooks);
}
