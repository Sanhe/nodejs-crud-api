const DEFAULT_FIRST_USER_ID = '78de1261-94dc-4be0-ac44-36d50886ad65';
const DEFAULT_SECOND_USER_ID = 'e7560682-b056-477f-97b6-c3cd8925f9ee';

const DEFAULT_USERS = [
  {
    id: '78de1261-94dc-4be0-ac44-36d50886ad65',
    username: 'John Doe',
    age: 23,
    hobbies: ['football', 'basketball'],
  },
  {
    id: 'e7560682-b056-477f-97b6-c3cd8925f9ee',
    username: 'Dow Jones',
    age: 35,
    hobbies: [],
  },
];

const USER_WITHOUT_ID = {
  username: 'John Dow',
  age: 25,
  hobbies: ['football', 'basketball'],
};

export {
  DEFAULT_FIRST_USER_ID,
  DEFAULT_SECOND_USER_ID,
  DEFAULT_USERS,
  USER_WITHOUT_ID,
};
