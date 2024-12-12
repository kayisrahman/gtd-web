import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { TaskService } from './task.service'
import { TaskFilter } from '../model/TaskFilter'
import { Task } from '../model/Task'
import { environment } from '../../environments/environment'
import { InboxService } from './inbox.service'


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

})
