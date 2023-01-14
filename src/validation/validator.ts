import BadRequestError from '../error/bad.request.error.js';
import { REQUIRED_FIELDS_MISSING } from '../response/response.message.js';
import {
  IValidationRule,
  IValidationRules,
} from './validation.rule.interface.js';
import IModel from '../component/model.interface.js';

function isFieldValid(field: unknown, rule: IValidationRule): boolean {
  if (rule.type === 'array') {
    const isNotArray = !Array.isArray(field);

    if (isNotArray) {
      return false;
    }

    if (rule.rule) {
      const isValidByRule = rule.rule(field);

      return isValidByRule;
    }

    return true;
  }

  return typeof field === rule.type;
}

function validateModel<T extends IModel>(
  model: T,
  validationRules: IValidationRules
): asserts model is T {
  const errors: string[] = [];

  Object.keys(validationRules).forEach((key) => {
    const rule = validationRules[key];
    const isKeyInModel = key in model;
    const isKeyMissedInModel = !isKeyInModel;
    const isRequired = rule.required;

    if (isRequired && isKeyMissedInModel) {
      errors.push(`Field ${key} is required`);
    } else if (isKeyInModel) {
      const modelKey = model[key as keyof T];
      const isValueValid = isFieldValid(modelKey, rule);

      if (!isValueValid) {
        errors.push(`Field ${key} has not valid type or value`);
      }
    }
  });

  if (errors.length > 0) {
    const errorsMessages = errors.join(', ');
    const errorMessage = `${REQUIRED_FIELDS_MISSING} ${errorsMessages}`;

    throw new BadRequestError(errorMessage);
  }
}

export { validateModel };
