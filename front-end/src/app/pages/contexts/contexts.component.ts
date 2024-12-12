import { Component, OnInit, ViewChild } from '@angular/core'
import { Context } from '../../model/Context'
import { MatTable } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ContextService } from '../../services/context.service'
import { ContextAddDialogComponent } from './context-add-dialog/context-add-dialog.component'

@Component({
  selector: 'app-contexts',
  templateUrl: './contexts.component.html',
  styleUrls: ['./contexts.component.scss']
})
export class ContextsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'context', 'review-freq', 'last-rev', 'next-rev', 'operations']
  dataSource: Array<Context>
  tableEvent: string = 'Save'
  context: Context

  @ViewChild(MatTable, { static: true }) table: MatTable<any>

  constructor(private contextService: ContextService,
              public dialog: MatDialog,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.contextService.getAll()
      .subscribe(value => this.dataSource = value)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContextAddDialogComponent, {
      width: '400px',
      data: { data: this.context, mode: this.tableEvent }
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

  addRowData(result: Context): void {
    this.contextService.save(result).subscribe(() => {
      this.matSnackBar.open('Data saved successfully', 'Dismiss', {
        duration: 2000
      })
      this.contextService.getAll()
        .subscribe(value => this.dataSource = value)
      this.table.renderRows()
    })
  }


  edit(id: number): void {
    this.tableEvent = 'Update'
    this.contextService.get(id).subscribe(rep => {
      this.context = rep
      this.openDialog()
    })
  }

  private updateRowData(result: Task) {
    this.contextService.update(result).subscribe(response => {
      this.matSnackBar.open('Data updated successfully', 'Dismiss', {
        duration: 2000
      })
      this.refreshData()
    })

    this.tableEvent = 'Save'
  }

  private refreshData() {
    this.contextService.getAll()
      .subscribe(value => this.dataSource = value)
    this.table.renderRows()
  }

  delete(id: number): void {
    this.contextService.delete(id).subscribe(() => {
      this.matSnackBar.open('Data deleted successfully', 'Dismiss', {
        duration: 2000
      })
      this.refreshData()
    })
  }

}
