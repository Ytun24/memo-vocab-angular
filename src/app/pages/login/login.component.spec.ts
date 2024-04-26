import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should redirect to login when form is valid and call signup successfully', () => {
    const authServiceSpy = spyOn(authService, 'postLogin').and.returnValue(
      of({})
    );

    const mockUserValue = {
      email: 'test@mail.com',
      password: 'password'
    };

    inputAndSubmitLoginForm(fixture, mockUserValue);

    expect(authServiceSpy).toHaveBeenCalledOnceWith(mockUserValue);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error notification when form is valid and call signup fail', () => {
    const authServiceSpy = spyOn(authService, 'postLogin').and.returnValue(
      throwError(() => new Error('sign up fail'))
    );
    const mockUserValue = {
      email: 'test@mail.com',
      password: 'password'
    };

    inputAndSubmitLoginForm(fixture, mockUserValue);

    const errorNoti = fixture.debugElement.query(By.css('#noti-error'));

    expect(authServiceSpy).toHaveBeenCalledOnceWith(mockUserValue);
    expect(errorNoti).toBeTruthy();
  });

  it('should not call signup when form is invalid', () => {
    const mockUserValue = {
      email: 'invalid-mail',
      password: 'invl',
    };
    const authServiceSpy = spyOn(authService, 'postLogin').and.stub();

    inputAndSubmitLoginForm(fixture, mockUserValue);

    expect(authServiceSpy).not.toHaveBeenCalled();
  });

  it('should display validation error message when no value', () => {
    const mockUserValue = {
      email: '',
      password: '',
    };

    inputAndSubmitLoginForm(fixture, mockUserValue);

    const emailValidationError = fixture.debugElement.query(
      By.css('#email-validation-error')
    );
    const passwordValidationError = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    expect(emailValidationError).toBeTruthy();
    expect(passwordValidationError).toBeTruthy();
  });

  it('should display validation error message when format validation error', () => {
    const mockUserValue = {
      email: 'invalid-mail',
      password: 'invl',
    };

    inputAndSubmitLoginForm(fixture, mockUserValue);

    const emailValidationError = fixture.debugElement.query(
      By.css('#email-validation-error')
    );
    const passwordValidationError = fixture.debugElement.query(
      By.css('#password-validation-error')
    );
    expect(emailValidationError).toBeTruthy();
    expect(passwordValidationError).toBeTruthy();
  });
});

const inputAndSubmitLoginForm = (fixture: any, mockUserValue: any) => {
  const emailDe = fixture.debugElement.query(By.css('input[name="email"]'));
  const emailEl = emailDe.nativeElement;
  emailEl.value = mockUserValue.email;
  emailEl.dispatchEvent(new Event('input'));

  const passwordDe = fixture.debugElement.query(By.css('input[name="password"]'));
  const passwordEl = passwordDe.nativeElement;
  passwordEl.value = mockUserValue.password;
  passwordEl.dispatchEvent(new Event('input'));
  fixture.detectChanges();

  const signupForm = fixture.debugElement.query(By.css('#login-form'));
  signupForm.triggerEventHandler('submit');
  fixture.detectChanges();
}
