import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxAddDialogComponent } from './inbox-add-dialog.component';

describe('InboxAddDialogComponent', () => {
  let component: InboxAddDialogComponent;
  let fixture: ComponentFixture<InboxAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxAddDialogComponent ]
    })
    .compileComponents();
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
