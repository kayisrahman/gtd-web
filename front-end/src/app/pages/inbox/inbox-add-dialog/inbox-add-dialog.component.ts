import { Component, Inject, OnInit, Optional } from '@angular/core'
import { Task } from 'src/app/model/task'
import { Priority } from '../../../model/enums/Priority'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Context } from '../../../model/Context'
import { ContextService } from '../../../services/context.service'

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

  constructor(
    public dialogRef: MatDialogRef<InboxAddDialogComponent>,
    private contextService: ContextService,
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
    this.contextService.getAll()
      .subscribe(value => this.contexts = value)
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required]),
      date: new FormControl(this.task.date),
      time: new FormControl(this.task.time),
      context: new FormControl(this.task.context),
      priority: new FormControl(this.task.priority),
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
    this.task.context = this.formGroup.controls.context.value;
    this.task.time = this.formGroup.controls.time.value;
    this.task.notes = this.formGroup.controls.notes.value;
    this.task.priority = this.formGroup.controls.priority.value;
  }

}
