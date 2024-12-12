import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxAddDialogComponent } from './inbox-add-dialog.component';
import { OrganizeComponent } from '../../organize/organize.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TaskService } from '../../../services/task.service'
import { ContextService } from '../../../services/context.service'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

describe('InboxAddDialogComponent', () => {
  let component: InboxAddDialogComponent;
  let fixture: ComponentFixture<InboxAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatAutocompleteModule],
      declarations: [InboxAddDialogComponent],
      providers: [
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => ({ subscribe: jasmine.createSpy('subscribe') }) }) } },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } },
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'Save' } },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
