import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionsControlService {

  constructor() { }

  toFormGroup(formlist: any[]) {
    const group: any = {};

    formlist.forEach((val, key) => {
      const validators = [];
      if (val.required) {
        validators.push(Validators.required);
      }
      if (val.regex) {
        validators.push(Validators.pattern(val.regex));
      }
      group[key] = new FormControl(val.value || '', validators);
    });

    return new FormGroup(group);
  }
}
