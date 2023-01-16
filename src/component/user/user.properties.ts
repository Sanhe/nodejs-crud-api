import UserPropertiesType from './user.properties.type';

const userPropertiesCreate: UserPropertiesType = ['username', 'age', 'hobbies'];

const userPropertiesUpdate: UserPropertiesType = [
  ...userPropertiesCreate,
  'id',
];

export { userPropertiesCreate, userPropertiesUpdate };
