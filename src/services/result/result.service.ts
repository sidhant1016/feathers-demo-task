// Initializes the `result` service on path `/result`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Result } from './result.class';
import createModel from '../../models/result.model';
import hooks from './result.hooks';

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

  // Initialize our service with any options it requires
  app.use('/result', new Result(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('result');

  service.hooks(hooks);
}
