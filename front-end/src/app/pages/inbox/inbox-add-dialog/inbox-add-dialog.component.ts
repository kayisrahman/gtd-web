import { Component, Inject, OnInit, Optional } from '@angular/core'
import { Task } from 'src/app/model/task'
import { Priority } from '../../../model/enums/Priority'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Context } from '../../../model/Context'
import { ContextService } from '../../../services/context.service'
import * as moment from 'moment'

@Component({
  selector: 'app-inbox-add-dialog',
  templateUrl: './inbox-add-dialog.component.html',
  styleUrls: ['./inbox-add-dialog.component.scss']
})
export class InboxAddDialogComponent implements OnInit {
  formGroup: FormGroup
  task: Task
  btnSave: string
  Priority = Priority

  contexts: Array<Context>
  prioritySelection: string

  constructor(
    public dialogRef: MatDialogRef<InboxAddDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.btnSave = data.mode;
    this.contexts = data.contexts;
    if (this.btnSave !== 'Save') {
      this.task = data.data;
    } else {
      this.task = {
        id: null, date: null, title: '', context_id: null,
        time: null, notes: null, priority: null
      };
    }
  }
  ngOnInit(): void {
    this.prioritySelection = this.getPriority(this.task.priority)
    this.formGroup = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required]),
      date: new FormControl(this.task.date),
      time: new FormControl(this.task.time ? moment.utc(this.task.time, 'HH:mm: a')
        .local()
        .format('HH:mm a') : ''),
      context: new FormControl(this.getContext(this.task.context_id).context),
      priority: new FormControl(Priority[this.getPriority(this.task.priority)]),
      notes: new FormControl(this.task.notes, [Validators.maxLength(200)]),
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
      this.dialogRef.close(this.task);
    }
  }

  mapValues(): void {
    this.task.title = this.formGroup.controls.title.value;
    this.task.date = this.formGroup.controls.date.value;
    this.task.context_id = this.formGroup.controls.context.value;
    this.task.time = this.formGroup.controls.time.value;
    this.task.notes = this.formGroup.controls.notes.value;
    this.task.priority = this.formGroup.controls.priority.value;
  }

  getContext(contextId: number): Context {
    return this.contexts?.find(x => x.id == contextId)
  }

  getPriority(pId: number) {
    return Object.keys(Priority)
      .find((k,v) =>  v == pId);
  }

}
