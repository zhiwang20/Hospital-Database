import { EMAIL_REGEX, FormsBase } from './forms-base';

const patientsForm = new Map();
patientsForm.set('patientId', new FormsBase({
  key: 'patientId',
  label: 'Patient ID',
  type: 'text',
  required: true
}));
patientsForm.set('patientName', new FormsBase({
  key: 'patientName',
  label: 'Patient Name',
  type: 'text',
  required: true
}));
patientsForm.set('gender', new FormsBase({
  key: 'gender',
  label: 'Gender',
  controlType: 'dropdown',
  required: true,
  options: [
    {key: 'M', value: 'M'},
    {key: 'F', value: 'F'}
  ]
}));
patientsForm.set('age', new FormsBase({
  key: 'age',
  label: 'Age',
  type: 'number',
  required: true
}));
patientsForm.set('bloodType', new FormsBase({
  key: 'bloodType',
  label: 'Blood Type',
  type: 'text',
  required: true
}));
patientsForm.set('phone', new FormsBase({
  key: 'phone',
  label: 'Phone',
  type: 'text',
  required: true
}));
patientsForm.set('patientAddress', new FormsBase({
  key: 'patientAddress',
  label: 'Address',
  type: 'text',
  required: true
}));
patientsForm.set('doctorId', new FormsBase({
  key: 'doctorId',
  label: 'Doctor',
  controlType: 'dropdown',
  type: 'text',
  required: true,
  path: 'doctors',
}));
patientsForm.set('patientType', new FormsBase({
  key: 'patientType',
  label: 'Patient Type',
  type: 'text',
  required: true
}));
patientsForm.set('department', new FormsBase({
  key: 'department',
  label: 'Department',
  controlType: 'dropdown',
  type: 'text',
  required: true,
  path: 'departments'
}));
patientsForm.set('wardId', new FormsBase({
  key: 'wardId',
  label: 'Ward',
  controlType: 'dropdown',
  type: 'text',
  required: false,
  path: 'wards'
}));

export const PatientsForm = patientsForm;
