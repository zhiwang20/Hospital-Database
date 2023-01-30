import { EMAIL_REGEX, FormsBase } from './forms-base';

const nurseForm = new Map();
nurseForm.set('nurseId', new FormsBase({
  key: 'nurseId',
  label: 'Nurse Id',
  type: 'text',
  required: true
}));
nurseForm.set('nurseName', new FormsBase({
  key: 'nurseName',
  label: 'Nurse Name',
  type: 'text',
  required: true
}));
nurseForm.set('gender', new FormsBase({
  key: 'gender',
  label: 'Gender',
  controlType: 'dropdown',
  required: true,
  options: [
    {key: 'M', value: 'M'},
    {key: 'F', value: 'F'}
  ]
}));
nurseForm.set('age', new FormsBase({
  key: 'age',
  label: 'Age',
  type: 'number',
  required: true
}));
nurseForm.set('email', new FormsBase({
  key: 'email',
  label: 'Email',
  type: 'email',
  regex: EMAIL_REGEX,
  required: true
}));
nurseForm.set('phone', new FormsBase({
  key: 'phone',
  label: 'Phone',
  type: 'text',
  required: true
}));


export const NurseForm = nurseForm;
