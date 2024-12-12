import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { TaskFilter } from '../model/TaskFilter'
import { Observable } from 'rxjs'
import { Task } from '../model/Task'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  private static readonly REST_API_URI = environment.restApi + environment.configContextPath + 'inbox'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(InboxService.REST_API_URI)
  }
}
