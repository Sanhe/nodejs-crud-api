import * as userController from './user.controller.js';
import RouteType from '../../routing/route.type.js';

const routes: RouteType[] = [
  {
    path: '/api/users',
    method: 'GET',
    handler: userController.get,
    params: [],
  },
  {
    path: '/api/users/',
    method: 'GET',
    handler: userController.getOne,
    params: ['id'],
  },
  {
    path: '/api/users',
    method: 'POST',
    handler: userController.create,
    params: [],
  },
  {
    path: '/api/users/',
    method: 'PUT',
    handler: userController.update,
    params: ['id'],
  },
  {
    path: '/api/users/',
    method: 'DELETE',
    handler: userController.remove,
    params: ['id'],
  },
];

export default routes;
