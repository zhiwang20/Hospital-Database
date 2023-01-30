import { EMAIL_REGEX, FormsBase } from './forms-base';

const bedsForm = new Map();
bedsForm.set('bedId', new FormsBase({
  key: 'bedId',
  label: 'Bed Id',
  type: 'text',
  required: true
}));
bedsForm.set('bedState', new FormsBase({
  key: 'bedState',
  label: 'Bed State',
  // controlType: 'dropdown',
  required: true
}));
bedsForm.set('nurseId', new FormsBase({
  key: 'nurseId',
  label: 'Nurse',
  path: 'nurses',
  controlType: 'dropdown',
  required: false
}));
bedsForm.set('wardId', new FormsBase({
  key: 'wardId',
  label: 'Ward',
  path: 'wards',
  controlType: 'dropdown',
  required: false
}));

export const BedsForm = bedsForm;
