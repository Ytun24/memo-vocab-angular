import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environment/environment';
import { PLATFORM_ID } from '@angular/core';

describe('AuthService - Browser', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
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

  it('[postSignUp] should call post signup correctly', () => {
    const testData = {
      email: 'test@mail.com',
      confirmPassword: 'password',
      password: 'password',
      name: 'test user',
    };
    service.postSignUp(testData).subscribe();

    const req = httpTestingController.expectOne(environment.beUrl + '/signup');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    httpTestingController.verify();
  });

  it('[postLogin] should call post login correctly', () => {
    const testData = {
      email: 'test@mail.com',
      password: 'password',
    };
    const setAuthTokenSpy = spyOn(service, 'setAuthToken').and.callThrough();

    service.postLogin(testData).subscribe(() => {
      expect(setAuthTokenSpy).toHaveBeenCalled();
    });

    const req = httpTestingController.expectOne(environment.beUrl + '/login');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    httpTestingController.verify();
  });

  it('[setAuthToken] should set auth token to local storage', () => {
    const setStorageSpy = spyOn(localStorage, 'setItem').and.stub();

    service.setAuthToken('testtoken');

    expect(setStorageSpy).toHaveBeenCalledOnceWith('token','testtoken');
  });

  it('[getAuthToken] should get auth token from local storage when it exist', () => {
    const getStorageSpy = spyOn(localStorage, 'getItem').withArgs('token').and.returnValue('testtoken');

    const result = service.getAuthToken();

    expect(getStorageSpy).toHaveBeenCalledOnceWith('token');
    expect(result).toEqual('testtoken');
  });

  it('[getAuthToken] should get empty string when auth token is not exist', () => {
    const getStorageSpy = spyOn(localStorage, 'getItem').withArgs('token').and.returnValue(null);

    const result = service.getAuthToken();

    expect(getStorageSpy).toHaveBeenCalledOnceWith('token');
    expect(result).toEqual('');
  });

});

describe('AuthService - Browser', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    service = TestBed.inject(AuthService);
  });

  it('[getAuthToken] should return empty string when platform is not browser', () => {
    const getStorageSpy = spyOn(localStorage, 'getItem').and.stub();

    const result = service.getAuthToken();

    expect(getStorageSpy).not.toHaveBeenCalled();
    expect(result).toEqual('');
  });
});
