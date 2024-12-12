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

  save(context: Context): Observable<Context> {
    return this.http.post<Context>(ContextService.REST_API_URI, context)
  }

  get(id: number): Observable<Context> {
    return this.http.get<Context>(`${ContextService.REST_API_URI}/${id}`)
  }

  update(context: Context): Observable<Context> {
    return this.http.put<Context>(`${ContextService.REST_API_URI}/${context.id}`, context)
  }

  delete(id: number): Observable<Context> {
    return null
  }
}
