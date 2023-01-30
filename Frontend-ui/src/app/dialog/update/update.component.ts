import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/api/api.service';
import { QuestionsControlService } from 'src/app/api/questions-control.service';
import { BedsForm } from 'src/app/forms-data/beds-form';
import { DepartmentsForm } from 'src/app/forms-data/departments-form';
import { DoctorsForm } from 'src/app/forms-data/doctors-form';
import { NurseForm } from 'src/app/forms-data/nurses-form';
import { OperationsForm } from 'src/app/forms-data/operations-form';
import { PatientsForm } from 'src/app/forms-data/patients-from';
import { UsersForm } from 'src/app/forms-data/users-form';
import { WardsForm } from 'src/app/forms-data/wards-form';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  title: string;
  formlist: any;
  form: FormGroup;
  item: any;

  formStatus = {
    state: 'form',
    err: 0,
    action: 'Create'
  };
  doneIcon = 'check_circle';
  finalMsg = '';

  constructor(
    private apiService: ApiService, private qcs: QuestionsControlService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UpdateComponent>,
  ) {
    this.title = data.title;
    this.item = data.item;
  }

  formRetrieval() {
    switch (this.title) {
      case 'doctors':
        return DoctorsForm;
      case 'nurses':
        return NurseForm;
      case 'wards':
        return WardsForm;
      case 'patients':
        return PatientsForm;
      case 'departments':
        return DepartmentsForm;
      case 'users':
        return UsersForm;
      case 'operations':
        return OperationsForm;
      case 'beds':
        return BedsForm;
    }
  }

  getForm() {
    const newForm = new Map();
    const formBase = this.formRetrieval();
    formBase.forEach((val, key) => {
      newForm.set(key, JSON.parse(JSON.stringify(val)));
      if (val.regex) {
        newForm.get(key).regex = val.regex;
      }
    });
    return newForm;
  }

  ngOnInit() {
    const formlist = this.getForm();
    this.formlist = [...formlist.values()];
    console.log(this.formlist);
    this.fetchOptions(formlist)
    formlist.forEach(val => {
      if (this.item.hasOwnProperty(val.key)) {
        val.value = this.item[val.key];
      }
    });
    this.form = this.qcs.toFormGroup(formlist as any);
  }

  fetchOptions(formlist) {
    formlist.forEach( val => {
      if (val.controlType !== 'dropdown') {
        return;
      }
      if (val.key !== 'gender') {
        this.apiService.list(val.path)
          .subscribe( (items: any[]) => {
            switch (val.path) {
              case 'departments': {
                val.options = items.reduce((acc, curr) => {
                  acc.push({key: curr.departmentName, value: curr.departmentName});
                  return acc;
                }, []);
                break;
              }
              case 'doctors': {
                val.options = items.reduce((acc, curr) => {
                  acc.push({key: curr.doctorId, value: curr.doctorName});
                  return acc;
                }, []);
                break;
              }
              case 'wards': {
                val.options = items.reduce((acc, curr) => {
                  acc.push({key: curr.wardId, value: curr.wardId});
                  return acc;
                }, []);
                break;
              }
              case 'patients': {
                val.options = items.reduce((acc, curr) => {
                  console.log(curr);
                  acc.push({key: curr.patientId, value: curr.patientName});
                  return acc;
                }, []);
                break;
              }
              case 'nurses': {
                val.options = items.reduce((acc, curr) => {
                  acc.push({key: curr.nurseId, value: curr.nurseName});
                  return acc;
                }, []);
                break;
              }
            }
          });
      }
    });
  }

  private success() {
    this.formStatus.state = 'done';
    this.formStatus.err = 0;
    this.doneIcon = 'check_circle';
    this.finalMsg = `Created ${this.title}.`;
    setTimeout(() => {
      this.dialogRef.close({ok: 1});
    }, 2500);
    // this.finalMsg = `Unable to update user ${this.payload.email} to ${this.parent.name}. Please try again later.`;
  }

  private fault() {
    this.formStatus.state = 'done';
    this.formStatus.err = 1;
    this.doneIcon = 'cancel';
    // this.editable = true;
    // this.finalMsg = `Updated user ${this.payload.email} to ${this.parent.name}`;
    this.finalMsg = `Unable to create ${this.title}. Please try again later.`;
  }

  private getId(path) {
    switch (path) {
      case 'users':
        return this.item['id'];
      case 'departments':
        return this.item['departmentName'];
      case 'doctors':
        return this.item['doctorId'];
      case 'wards':
        return this.item['wardId'];
      case 'patients':
        return this.item['patientId'];
      case 'operations':
        return this.item['operationId'];
      case 'nurses':
        return this.item['nurseId'];
      case 'beds':
        return this.item['bedId'];
    }
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.formStatus.state = 'checking';
      const val = {...this.form.value};
      Object.keys(val).forEach( key => {
        if (!val[key]) delete val[key];
      });
      this.apiService.update(this.title, this.getId(this.title), val)
        .subscribe( res => {
          this.success();
        }, err => {
          console.error(err);
          this.fault();
        });
    } else {
      console.warn('form invalid');
    }
  }

}
