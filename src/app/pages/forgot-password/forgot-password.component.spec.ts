import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    router.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login when email is valid and call forgot password successfully', () => {
    const expectedEmail = 'test@mail.com';
    const postForgotPasswordSpy = spyOn(
      authService,
      'postForgotPassword'
    ).and.returnValue(of({}));
    let emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = expectedEmail;
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const sendEmailBtn = fixture.debugElement.query(By.css('#send-email-btn'));
    sendEmailBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(postForgotPasswordSpy).toHaveBeenCalledOnceWith({
      email: expectedEmail,
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display error validation message not call forgot password when email is not valid', () => {
    const expectedEmail = 'test$';
    const postForgotPasswordSpy = spyOn(
      authService,
      'postForgotPassword'
    ).and.returnValue(of({}));
    let emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = expectedEmail;
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const sendEmailBtn = fixture.debugElement.query(By.css('#send-email-btn'));
    sendEmailBtn.triggerEventHandler('click');
    fixture.detectChanges();
    const emailValidationError = fixture.debugElement.query(
      By.css('#email-validation-error')
    );

    expect(emailValidationError).toBeTruthy();
    expect(postForgotPasswordSpy).not.toHaveBeenCalled();
  });

  it('should display error validation message and not call forgot password when email is not empty', () => {
    const expectedEmail = '';
    const postForgotPasswordSpy = spyOn(
      authService,
      'postForgotPassword'
    ).and.returnValue(of({}));
    let emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = expectedEmail;
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const sendEmailBtn = fixture.debugElement.query(By.css('#send-email-btn'));
    sendEmailBtn.triggerEventHandler('click');
    fixture.detectChanges();
    const emailValidationError = fixture.debugElement.query(
      By.css('#email-validation-error')
    );
    
    expect(emailValidationError).toBeTruthy();
    expect(postForgotPasswordSpy).not.toHaveBeenCalled();
  });

  it('should display error notification when email is valid and call forgot password fail', () => {
    const expectedEmail = 'test@mail.com';
    const postForgotPasswordSpy = spyOn(
      authService,
      'postForgotPassword'
    ).and.returnValue(throwError(() => new Error('forgot password fail')));
    let emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = expectedEmail;
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const sendEmailBtn = fixture.debugElement.query(By.css('#send-email-btn'));
    sendEmailBtn.triggerEventHandler('click');
    fixture.detectChanges();
    const errorNoti = fixture.debugElement.query(By.css('#noti-error'));
    
    expect(errorNoti).toBeTruthy();
    expect(postForgotPasswordSpy).toHaveBeenCalledOnceWith({
      email: expectedEmail,
    });
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
