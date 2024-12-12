import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Task } from '../model/Task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private static readonly REST_API_URI = environment.restApi + environment.configContextPath + 'tasks'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(TaskService.REST_API_URI)
  }

  save(task: Task): Observable<Task> {
    return this.http.post<Task>(TaskService.REST_API_URI, task)
  }

  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${TaskService.REST_API_URI}/${id}`)
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${TaskService.REST_API_URI}/${task.id}`, task)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${TaskService.REST_API_URI}/${id}`)
  }
}
