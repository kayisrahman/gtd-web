import { Component, Inject, OnInit, Optional } from '@angular/core'
import { Task } from 'src/app/model/task'
import { Priority } from '../../../model/enums/Priority'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'

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

  constructor(
    public dialogRef: MatDialogRef<InboxAddDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.btnSave = data.mode;
    if (this.btnSave !== 'Save') {
      this.task = data.data;
    } else {
      this.task = {
        id: null, date: null, title: '', context: null,
        time: null, notes: null, priority: null
      };
    }
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required]),
      date: new FormControl(this.task.date),
      time: new FormControl(this.task.time),
      context: new FormControl(this.task.context),
      // priority: new FormControl(this.task.priority),
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
  }

  protected readonly Date = Date
}
