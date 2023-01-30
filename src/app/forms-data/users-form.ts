import { EMAIL_REGEX, FormsBase } from './forms-base';

const usersForm = new Map();
usersForm.set('email', new FormsBase({
  key: 'email',
  label: 'Email',
  type: 'email',
  regex: EMAIL_REGEX,
  required: true
}));
usersForm.set('password', new FormsBase({
  key: 'password',
  label: 'Password',
  type: 'password',
  required: true
}));
usersForm.set('kind', new FormsBase({
  key: 'kind',
  label: 'Type',
  required: false
}));

export const UsersForm = usersForm;
