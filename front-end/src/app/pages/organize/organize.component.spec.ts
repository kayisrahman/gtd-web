import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganizeComponent } from './organize.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TaskService } from '../../services/task.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ContextService } from '../../services/context.service'
import { MatSnackBar } from '@angular/material/snack-bar'

describe('OrganizeComponent', () => {
  let component: OrganizeComponent;
  let fixture: ComponentFixture<OrganizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [OrganizeComponent],
      providers: [
        TaskService,
        ContextService,
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => ({ subscribe: jasmine.createSpy('subscribe') }) }) } },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
