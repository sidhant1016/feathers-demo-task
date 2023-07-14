// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/users.model';
import hooks from './users.hooks';
import UserSchema from './users.joi';
import { BadRequest } from '@feathersjs/errors';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'users': Users & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };
    class UsersService extends Users {
    async create(data: any, params: any) {
      const { error } = UserSchema.validate(data);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }
      return super.create(data, params);
    }
  }

  // Initialize our service with any options it requires
  app.use('/users', new UsersService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
}
