import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login when form is valid and call signup successfully', () => {
    const authServiceSpy = spyOn(authService, 'postSignUp').and.returnValue(
      of({})
    );
    const mockUserValue = {
      email: 'test@mail.com',
      confirmPassword: 'password',
      password: 'password',
      name: 'test user',
    };
    component.signupFormGroup.patchValue(mockUserValue);

    const signupForm = fixture.debugElement.query(By.css('#signup-form'));
    signupForm.triggerEventHandler('submit');
    fixture.detectChanges();

    expect(authServiceSpy).toHaveBeenCalledOnceWith(mockUserValue);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display error notification when form is valid and call signup fail', () => {
    const authServiceSpy = spyOn(authService, 'postSignUp').and.returnValue(
      throwError(() => new Error('sign up fail'))
    );
    const mockUserValue = {
      email: 'test@mail.com',
      confirmPassword: 'password',
      password: 'password',
      name: 'test user',
    };
    component.signupFormGroup.patchValue(mockUserValue);

    const signupForm = fixture.debugElement.query(By.css('#signup-form'));
    signupForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const errorNoti = fixture.debugElement.query(By.css('#noti-error'));

    expect(authServiceSpy).toHaveBeenCalledOnceWith(mockUserValue);
    expect(errorNoti).toBeTruthy();
  });

  it('should not call signup when form is invalid', () => {
    const mockUserValue = {
      email: 'invalid-mail',
      confirmPassword: 'invl',
      password: 'invl',
      name: 'test$',
    };
    const authServiceSpy = spyOn(authService, 'postSignUp').and.stub();
    component.signupFormGroup.patchValue(mockUserValue);

    const signupForm = fixture.debugElement.query(By.css('#signup-form'));
    signupForm.triggerEventHandler('submit');
    fixture.detectChanges();

    expect(authServiceSpy).not.toHaveBeenCalled();
  });

  it('should display validation error message when no value', () => {
    const mockUserValue = {
      email: '',
      confirmPassword: '',
      password: '',
      name: '',
    };
    component.signupFormGroup.patchValue(mockUserValue);
    component.signupFormGroup.markAllAsTouched();

    const signupForm = fixture.debugElement.query(By.css('#signup-form'));
    signupForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const emailValidationError = fixture.debugElement.query(
      By.css('#email-validation-error')
    );
    const nameValidationError = fixture.debugElement.query(
      By.css('#name-validation-error')
    );
    const passwordValidationError = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    const confirmPasswordValidationError = fixture.debugElement.query(
      By.css('#confirm-password-validation-error')
    );

    expect(emailValidationError).toBeTruthy();
    expect(nameValidationError).toBeTruthy();
    expect(passwordValidationError).toBeTruthy();
    expect(confirmPasswordValidationError).toBeTruthy();
  });

  it('should display validation error message when format validation error', () => {
    const mockUserValue = {
      email: 'invalid-mail',
      confirmPassword: 'invl',
      password: 'invl',
      name: 'test$',
    };
    component.signupFormGroup.patchValue(mockUserValue);
    component.signupFormGroup.markAllAsTouched();

    const signupForm = fixture.debugElement.query(By.css('#signup-form'));
    signupForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const emailValidationError = fixture.debugElement.query(
      By.css('#email-validation-error')
    );
    const nameValidationError = fixture.debugElement.query(
      By.css('#name-validation-error')
    );
    const passwordValidationError = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    const confirmPasswordValidationError = fixture.debugElement.query(
      By.css('#confirm-password-validation-error')
    );

    expect(emailValidationError).toBeTruthy();
    expect(nameValidationError).toBeTruthy();
    expect(passwordValidationError).toBeTruthy();
    expect(confirmPasswordValidationError).toBeTruthy();
  });
});
