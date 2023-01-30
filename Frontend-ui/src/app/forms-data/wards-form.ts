import { EMAIL_REGEX, FormsBase } from './forms-base';

const wardsForm = new Map();
wardsForm.set('wardId', new FormsBase({
  key: 'wardId',
  label: 'Ward Id',
  type: 'text',
  required: true
}));
wardsForm.set('wardLocation', new FormsBase({
  key: 'wardLocation',
  label: 'Location',
  required: true
}));
wardsForm.set('bedNumber', new FormsBase({
  key: 'bedNumber',
  label: 'Bed Numbers',
  type: 'number',
  required: true
}));
wardsForm.set('department', new FormsBase({
  key: 'department',
  label: 'Department',
  controlType: 'dropdown',
  type: 'text',
  required: true,
  path: 'departments'
}));

export const WardsForm = wardsForm;
