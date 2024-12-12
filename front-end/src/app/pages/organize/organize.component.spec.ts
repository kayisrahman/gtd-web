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
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for TaskService
      declarations: [OrganizeComponent],
      providers: [
        TaskService, // Provide TaskService
        ContextService, // Provide ContextService
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => ({ subscribe: jasmine.createSpy('subscribe') }) }) } }, // Mock MatDialog
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } }, // Mock MatSnackBar
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef
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
