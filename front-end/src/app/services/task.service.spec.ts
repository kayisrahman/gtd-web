import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { TaskService } from './task.service'
import { Task } from '../model/Task'
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch all tasks from the tasks api', () => {
    const mockTasks: Task[] = [
      { "id": 1, title: 'Task 1', status: 'Todo' },
      { "id": 2, title: 'Task 2', status: 'Done' },
    ];

    service.getAll({}).subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(REST_API_URI);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
})
