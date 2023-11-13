import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './services/api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user repositories via GET', () => {
    const username = 'testuser';
    const mockResponse = [
      { name: 'repo1' },
      { name: 'repo2' }
    ];

    service.getUserRepositories(username, 1, 10).subscribe((repos: string | any[]) => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=1&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
