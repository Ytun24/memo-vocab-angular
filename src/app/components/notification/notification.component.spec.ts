import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notification element when display inout is true', () => {
    component.display = true;
    const notification = fixture.debugElement.query(By.css('#noti-success'));
    expect(notification).toBeTruthy();
  });

  it('should hide notification element when click close', () => {
    const closeBtn = fixture.debugElement.query(By.css('#close-btn'));
    closeBtn.triggerEventHandler('click');

    fixture.detectChanges();

    const notification = fixture.debugElement.query(By.css('#noti-success'));
    expect(notification).toBeFalsy();
  });
});
