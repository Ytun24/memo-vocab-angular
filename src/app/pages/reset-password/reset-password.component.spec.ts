import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get(param: string) {
                  return param + '-test';
                },
              },
            },
          },
        },
        AuthService,
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
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

  it('should redirect to login when form is valid and call reset password successfully', () => {
    const authServiceSpy = spyOn(
      authService,
      'postResetPassword'
    ).and.returnValue(of({}));
    const mockUserValue = {
      confirmPassword: 'password',
      password: 'password',
    };
    component.resetPasswordForm.patchValue(mockUserValue);

    const resetPasswordForm = fixture.debugElement.query(
      By.css('#reset-password-form')
    );
    resetPasswordForm.triggerEventHandler('submit');
    fixture.detectChanges();

    expect(authServiceSpy).toHaveBeenCalledOnceWith({
      ...mockUserValue,
      userId: 'id-test',
      resetToken: 'token-test',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display validation error and not call reset password when form value is empty', () => {
    const mockUserValue = {
      confirmPassword: '',
      password: '',
    };
    const authServiceSpy = spyOn(authService, 'postResetPassword').and.stub();
    component.resetPasswordForm.patchValue(mockUserValue);
    component.resetPasswordForm.markAllAsTouched();

    const resetPasswordForm = fixture.debugElement.query(
      By.css('#reset-password-form')
    );
    resetPasswordForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const passwordValidationError = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    const confirmPasswordValidationError = fixture.debugElement.query(
      By.css('#confirm-password-validation-error')
    );

    expect(passwordValidationError).toBeTruthy();
    expect(confirmPasswordValidationError).toBeTruthy();
    expect(authServiceSpy).not.toHaveBeenCalled();
  });

  it('should display validation error and not call reset password when password value is not valid', () => {
    const mockUserValue = {
      confirmPassword: 'pass',
      password: 'pass',
    };
    const authServiceSpy = spyOn(authService, 'postResetPassword').and.stub();
    component.resetPasswordForm.patchValue(mockUserValue);
    component.resetPasswordForm.markAllAsTouched();

    const resetPasswordForm = fixture.debugElement.query(
      By.css('#reset-password-form')
    );
    resetPasswordForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const passwordValidationError = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    const confirmPasswordValidationError = fixture.debugElement.query(
      By.css('#confirm-password-validation-error')
    );

    expect(passwordValidationError).toBeTruthy();
    expect(confirmPasswordValidationError).toBeTruthy();
    expect(authServiceSpy).not.toHaveBeenCalled();
  });

  it('should display error notification when form is valid and call reset password fail', () => {
    const authServiceSpy = spyOn(
      authService,
      'postResetPassword'
    ).and.returnValue(throwError(() => new Error('reset password fail')));
    const mockUserValue = {
      confirmPassword: 'password',
      password: 'password',
    };
    component.resetPasswordForm.patchValue(mockUserValue);

    const resetPasswordForm = fixture.debugElement.query(
      By.css('#reset-password-form')
    );
    resetPasswordForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const errorNoti = fixture.debugElement.query(By.css('#noti-error'));

    expect(authServiceSpy).toHaveBeenCalledOnceWith({
      ...mockUserValue,
      userId: 'id-test',
      resetToken: 'token-test',
    });
    expect(errorNoti).toBeTruthy();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should display password matcher validation error and not call reset password when password is not match', () => {
    const mockUserValue = {
      confirmPassword: 'confirm-password',
      password: 'password',
    };
    const authServiceSpy = spyOn(authService, 'postResetPassword').and.stub();
    component.resetPasswordForm.patchValue(mockUserValue);
    component.resetPasswordForm.markAllAsTouched();

    const resetPasswordForm = fixture.debugElement.query(
      By.css('#reset-password-form')
    );
    resetPasswordForm.triggerEventHandler('submit');
    fixture.detectChanges();

    const matcherPasswordValidationError = fixture.debugElement.query(
      By.css('#matcher-password-validation-error')
    );

    expect(matcherPasswordValidationError).toBeTruthy();
    expect(authServiceSpy).not.toHaveBeenCalled();
  });
});
