import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  displayedColumns: string[] = ['title', 'notes', 'date', 'time', 'context', 'priority', 'operations']
  dataSource: []
  currentPage: any
  pageSize: any

  constructor() { }

  ngOnInit(): void {
  }

}
