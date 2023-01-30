import { EMAIL_REGEX, FormsBase } from './forms-base';

const departmentsForm = new Map();
departmentsForm.set('departmentName', new FormsBase({
  key: 'departmentName',
  label: 'Department Name',
  type: 'text',
  required: true
}));
departmentsForm.set('phone', new FormsBase({
  key: 'phone',
  label: 'Phone',
  required: true
}));
departmentsForm.set('location', new FormsBase({
  key: 'location',
  label: 'Location',
  type: 'text',
  required: true
}));
departmentsForm.set('fax', new FormsBase({
  key: 'fax',
  label: 'Fax',
  type: 'text',
  required: true
}));
departmentsForm.set('chief', new FormsBase({
  key: 'chief',
  label: 'Chief',
  type: 'text',
  required: true
}));

export const DepartmentsForm = departmentsForm;
