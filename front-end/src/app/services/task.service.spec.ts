import { TestBed } from '@angular/core/testing'

import { TaskService } from './task.service'
import { TaskFilter } from '../model/TaskFilter'
import { Task } from '../model/Task'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { environment } from '../../environments/environment'


describe('TaskService', () => {
  const REST_API_URI = environment.restApi + environment.configContextPath + 'tasks'

  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should fetch all tasks with filters', () => {
  //   const mockTasks: Task[] = [
  //     { 'id': 1, title: 'Task 1', status: 'Todo' },
  //     { 'id': 2, title: 'Task 2', status: 'Done' }
  //   ]
  //
  //   const filter: TaskFilter = { status: 'Todo' }
  //
  //   service.getAll(filter).subscribe((tasks) => {
  //     expect(tasks).toEqual(mockTasks)
  //   })
  //
  //   const req = httpMock.expectOne((request) =>
  //     request.url === REST_API_URI && request.method === 'GET'
  //   )
  //   expect(req.request.params.get('status')).toBe('Todo')
  //
  //   req.flush(mockTasks)
  // })

})
