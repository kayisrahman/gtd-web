import { TestBed } from '@angular/core/testing'

import { ContextService } from './context.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TaskService } from './task.service'

describe('ContextService', () => {
  let service: ContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(ContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
