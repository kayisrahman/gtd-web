import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing' // Import HttpClientTestingModule
import { InboxService } from './inbox.service';
import { environment } from '../../environments/environment'
import { Task } from '../model/Task'

describe('InboxService', () => {
  let service: InboxService;
  let httpMock: HttpTestingController;
  const REST_API_URI = environment.restApi + environment.configContextPath + 'inbox';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
      providers: [InboxService],
    });
    service = TestBed.inject(InboxService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks from the inbox', () => {
    const mockTasks: Task[] = [
      { "id": 1, title: 'Task 1', status: 'Todo' },
      { "id": 2, title: 'Task 2', status: 'Done' },
    ];

    service.getAll().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(REST_API_URI);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
});
