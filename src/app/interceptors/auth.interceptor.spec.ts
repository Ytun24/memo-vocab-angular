import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([interceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add auth headers when auth token is exist', () => {
    const url = '/mockendpoint';
    spyOn(authService, 'getAuthToken').and.returnValue('testtoken');

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Authorization')).toEqual(
      'Bearer testtoken'
    );
  });

  it('should not add auth headers when auth token is empty', () => {
    const url = '/mockendpoint';
    spyOn(authService, 'getAuthToken').and.returnValue('');

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Authorization')).toEqual(null);
  });
});
