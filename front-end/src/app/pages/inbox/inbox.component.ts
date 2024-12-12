import { Component, OnInit, ViewChild } from '@angular/core'
import { Task } from 'src/app/model/Task'
import { TaskService } from '../../services/task.service'
import { InboxAddDialogComponent } from './inbox-add-dialog/inbox-add-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTable } from '@angular/material/table'
import { ContextService } from '../../services/context.service'
import { Context } from '../../model/Context'
import { Priority } from '../../model/enums/Priority'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'notes', 'date', 'time', 'context', 'priority', 'operations']
  dataSource: Array<Task>
  task: Task
  tableEvent: string = 'Save'
  contexts: Array<Context>


  @ViewChild(MatTable, { static: true }) table: MatTable<any>

  constructor(private taskService: TaskService,
              private contextService: ContextService,
              public dialog: MatDialog,
              private matSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe(value => this.dataSource = value)
    this.contextService.getAll()
      .subscribe(value => this.contexts = value)
  }

  openDialog() {
    const dialogRef = this.dialog.open(InboxAddDialogComponent, {
      width: '400px',
      data: { data: this.task, mode: this.tableEvent, contexts: this.contexts }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.tableEvent === 'Save') {
          this.addRowData(result)
        } else if (this.tableEvent === 'Update') {
          this.updateRowData(result)
        }
      }
      this.tableEvent = 'Save'
    })
  }

  addRowData(result: Task): void {
    this.taskService.save(result).subscribe(() => {
      this.matSnackBar.open('Data saved successfully', 'Dismiss', {
        duration: 2000
      })
      this.taskService.getAll()
        .subscribe(value => this.dataSource = value)
      this.table.renderRows()
    })
  }

  getContext(contextId: number): Context {
    return this.contexts?.find(x => x.id == contextId)
  }

  getPriority(pId: number) {
    return Object.keys(Priority)
      .find((k, v) => v == pId)
  }

  edit(id: number): void {
    this.tableEvent = 'Update'
    this.taskService.get(id).subscribe(rep => {
      this.task = rep
      this.openDialog()
    })
  }

  private updateRowData(result: Task) {
    this.taskService.update(result).subscribe(response => {
      this.matSnackBar.open('Data updated successfully', 'Dismiss', {
        duration: 2000
      })
      this.refreshData()
    })

    this.tableEvent = 'Save'
  }

  private refreshData() {
    this.taskService.getAll()
      .subscribe(value => this.dataSource = value)
    this.table.renderRows()
  }

  delete(id: number): void {
    this.taskService.delete(id).subscribe(() => {
      this.matSnackBar.open('Data deleted successfully', 'Dismiss', {
        duration: 2000
      })
      this.refreshData()
    })
  }

  markAsDone(id: number, index: number): void {
    this.taskService.done(id).subscribe(() => {
      this.dataSource.splice(index, 1)
      setTimeout(() => {
        this.table.renderRows()
      }, 3000)
    })
  }
}
