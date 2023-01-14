import { IValidationRules } from '../../validation/validation.rule.interface';

const createUserRules: IValidationRules = {
  username: {
    required: true,
    type: 'string',
  },
  age: {
    required: true,
    type: 'number',
  },
  hobbies: {
    required: true,
    type: 'array',
    rule: (arr: Array<unknown>): boolean => {
      return arr.every((item) => typeof item === 'string');
    },
  },
};

const updateUserRules = createUserRules;

export { createUserRules, updateUserRules };
