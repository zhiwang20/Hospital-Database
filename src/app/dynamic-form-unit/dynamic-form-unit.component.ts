import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsBase } from '../forms-data/forms-base';

@Component({
  selector: 'app-dynamic-form-unit',
  templateUrl: './dynamic-form-unit.component.html',
  styleUrls: ['./dynamic-form-unit.component.css']
})
export class DynamicFormUnitComponent {
  @Input() question: FormsBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

}
