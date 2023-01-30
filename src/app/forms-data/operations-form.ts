import { EMAIL_REGEX, FormsBase } from './forms-base';

const operationsForm = new Map();
operationsForm.set('startTime', new FormsBase({
  key: 'startTime',
  label: 'Start Time',
  type: 'text',
  required: true
}));
operationsForm.set('endTime', new FormsBase({
  key: 'endTime',
  label: 'End Time',
  required: true
}));
operationsForm.set('result', new FormsBase({
  key: 'result',
  label: 'Result',
  type: 'text',
  required: true
}));
operationsForm.set('patientId', new FormsBase({
  key: 'patientId',
  label: 'Patient',
  controlType: 'dropdown',
  required: true,
  path: 'patients',
}));
operationsForm.set('doctorId', new FormsBase({
  key: 'doctorId',
  label: 'Doctor',
  controlType: 'dropdown',
  required: true,
  path: 'doctors'
}));
operationsForm.set('operationType', new FormsBase({
  key: 'operationType',
  label: 'Operation Type',
  required: true
}));

export const OperationsForm = operationsForm;
