interface IValidationRule {
  required: boolean;
  type: string;
  rule?: (value: Array<unknown>) => boolean;
}

interface IValidationRules {
  [index: string]: IValidationRule;
}

export { IValidationRule, IValidationRules };
