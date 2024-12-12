import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextAddDialogComponent } from './context-add-dialog.component';

describe('ContextAddDialogComponent', () => {
  let component: ContextAddDialogComponent;
  let fixture: ComponentFixture<ContextAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
