import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post signup correctly', () => {
    const testData = {
      email: 'test@mail.com',
      confirmPassword: 'password',
      password: 'password',
      name: 'test user',
    };
    service.postSignUp(testData).subscribe();

    const req = httpTestingController.expectOne(service.beUrl + '/signup');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    httpTestingController.verify();
  });

  it('should call post login correctly', () => {
    const testData = {
      email: 'test@mail.com',
      password: 'password',
    };
    service.postLogin(testData).subscribe();

    const req = httpTestingController.expectOne(service.beUrl + '/login');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    httpTestingController.verify();
  });
});
