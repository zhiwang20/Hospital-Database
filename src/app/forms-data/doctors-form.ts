import { EMAIL_REGEX, FormsBase } from './forms-base';

const doctorsForm = new Map();
doctorsForm.set('doctorId', new FormsBase({
  key: 'doctorId',
  label: 'Doctor ID',
  type: 'text',
  required: true
}));
doctorsForm.set('doctorName', new FormsBase({
  key: 'doctorName',
  label: 'Doctor Name',
  type: 'text',
  required: true
}));
doctorsForm.set('gender', new FormsBase({
  key: 'gender',
  label: 'Gender',
  controlType: 'dropdown',
  required: true,
  options: [
    {key: 'M', value: 'M'},
    {key: 'F', value: 'F'}
  ]
}));
doctorsForm.set('age', new FormsBase({
  key: 'age',
  label: 'Age',
  type: 'number',
  required: true
}));
doctorsForm.set('education', new FormsBase({
  key: 'education',
  label: 'Education',
  type: 'text',
  required: true
}));
doctorsForm.set('email', new FormsBase({
  key: 'email',
  label: 'Email',
  type: 'email',
  regex: EMAIL_REGEX,
  required: true
}));
doctorsForm.set('phone', new FormsBase({
  key: 'phone',
  label: 'Phone',
  type: 'text',
  required: true
}));
doctorsForm.set('department', new FormsBase({
  key: 'department',
  label: 'Department',
  type: 'text',
  required: true,
  controlType: 'dropdown',
  path: 'departments',
}));
// doctorsForm.set('accountId', new FormsBase({
//   key: 'department',
//   label: 'Account',
//   type: 'dropdown',
//   required: false
// }));

export const DoctorsForm = doctorsForm;
