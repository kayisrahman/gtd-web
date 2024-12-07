import { Component, OnInit, ViewChild } from '@angular/core'
import { Task } from 'src/app/model/task'
import { TaskService } from '../../services/task.service'
import { InboxAddDialogComponent } from './inbox-add-dialog/inbox-add-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTable } from '@angular/material/table'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  displayedColumns: string[] = ['title', 'notes', 'date', 'time', 'context', 'priority', 'operations']
  dataSource: Array<Task>
  currentPage: any
  pageSize: any
  task: Task
  tableEvent: string = 'Save'


  @ViewChild(MatTable, { static: true }) table: MatTable<any>

  constructor(private taskService: TaskService,
              public dialog: MatDialog,
              private matSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe(value => this.dataSource = value)
  }

  openDialog() {
    const dialogRef = this.dialog.open(InboxAddDialogComponent, {
      width: '400px',
      data: { data: this.task, mode: this.tableEvent }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.tableEvent === 'Save') {
          this.addRowData(result)
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

}
