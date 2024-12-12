import { Component, OnInit, ViewChild } from '@angular/core'
import { Task } from '../../model/Task'
import { Context } from '../../model/Context'
import { MatTable } from '@angular/material/table'
import { TaskService } from '../../services/task.service'
import { ContextService } from '../../services/context.service'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { InboxAddDialogComponent } from '../inbox/inbox-add-dialog/inbox-add-dialog.component'
import { Priority } from '../../model/enums/Priority'
import { Router } from '@angular/router'
import { TaskFilter } from '../../model/TaskFilter'

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'notes', 'date', 'time', 'context', 'priority', 'status', 'operations']
  dataSource: Array<Task>
  task: Task
  tableEvent: string = 'Save'
  contexts: Array<Context>
  pageName: string = 'Organize'

  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  filter: TaskFilter = { status: '', context_id: null, date: null, time: null }

  constructor(private taskService: TaskService,
              private contextService: ContextService,
              public router: Router,
              public dialog: MatDialog,
              private matSnackBar: MatSnackBar) {

    if (this.router.url == '/organize') {
      this.pageName = 'Organize'
      this.filter = { status: '' }
    } else if (this.router.url == '/next-actions') {
      this.pageName = 'Next Action'
      this.filter = { category: 'NextActions' }
    } else if (this.router.url == '/waiting-for') {
      this.pageName = 'Waiting For'
      this.filter = { category: 'WaitingFor' }
    } else if (this.router.url == '/some-day') {
      this.pageName = 'Someday/Maybe'
      this.filter = { category: 'SomedayMaybe'}
    }else if (this.router.url == '/plan-more') {
      this.pageName = 'Plan More'
      this.filter = { category: 'PlanMore'}
    }
  }

  ngOnInit(): void {

    this.taskService.getAll(this.filter)
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
      this.taskService.getAll(this.filter)
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
    this.taskService.getAll(this.filter)
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
      }, 30)
    })
  }
}

