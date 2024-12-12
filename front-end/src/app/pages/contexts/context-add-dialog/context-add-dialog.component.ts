import { Component, Inject, OnInit, Optional } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Task } from '../../../model/Task'
import { Context } from '../../../model/Context'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Status } from '../../../model/enums/Status'
import * as moment from 'moment/moment'

@Component({
  selector: 'app-context-add-dialog',
  templateUrl: './context-add-dialog.component.html',
  styleUrls: ['./context-add-dialog.component.scss']
})
export class ContextAddDialogComponent implements OnInit {
  formGroup: FormGroup
  context: Context
  btnSave: string
  contexts: Array<Context>

  constructor(
    public dialogRef: MatDialogRef<ContextAddDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.btnSave = data.mode;
    if (this.btnSave !== 'Save') {
      this.context = data.data;
    } else {
      this.context = {id: null, context: null};
    }
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      context: new FormControl(this.context.context, [Validators.required]),
      reviewFreq: new FormControl(this.context.reviewfreq),
      lastRev: new FormControl(this.context.lastrev),
      nextRev: new FormControl(this.context.nextrev),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      this.mapValues();
      this.dialogRef.close(this.context);
    }
  }

  mapValues(): void {
    this.context.context = this.formGroup.controls.context.value;
    this.context.nextrev = moment(this.formGroup.controls.nextRev.value, 'DD/MM/yyyy' ).format("yyyy-MM-DD");
    this.context.lastrev = this.formGroup.controls.lastRev.value;
    this.context.reviewfreq = this.formGroup.controls.reviewFreq.value;
  }

  calNextReview(): void{
    let reviewFreq = this.formGroup.controls.reviewFreq.value || 0;
    let lastReview = this.formGroup.controls.lastRev.value || new Date()
    let nextReview = moment(lastReview).add('days', reviewFreq).format("DD/MM/yyyy")
    this.formGroup.controls.nextRev.setValue(nextReview)
  }

}
