import { Component, OnInit } from '@angular/core'
import { Task } from 'src/app/model/task'
import { TaskService } from '../../services/task.service'

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

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe(value => this.dataSource = value)
  }

}
