import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Context } from '../model/Context'

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private static readonly REST_API_URI = environment.restApi + environment.configContextPath + 'context'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Context>> {
    return this.http.get<Array<Context>>(ContextService.REST_API_URI)
  }

  save(result: Task): Observable<Context> {
    return null
  }

  get(id: number): Observable<Context> {
    return null
  }

  update(result: Task): Observable<Context> {
    return null
  }

  delete(id: number): Observable<Context> {
    return null
  }
}
