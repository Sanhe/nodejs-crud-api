interface IValidationRule {
  required: boolean;
  type: string;
  rule?: (value: any) => boolean;
}

interface IValidationRules {
  [index: string]: IValidationRule;
}

export { IValidationRule, IValidationRules };
