import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return solved problem IDs when user exists', () => {
    const dummyUsername = 'testuser';
    const dummyUid = 123;
    const dummySolvedData = [
      {
        solved: [3, 0] // Problems 0 and 1 are solved
      }
    ];

    service.getSolved(dummyUsername).subscribe((solved) => {
      expect(solved).toEqual([0, 1]);
    });

    const reqUid = httpMock.expectOne(`${service.url}/uname2uid/${dummyUsername}`);
    expect(reqUid.request.method).toBe('GET');
    reqUid.flush(dummyUid);

    const reqSolved = httpMock.expectOne((req) => req.url.startsWith(`${service.url}/solved-bits/${dummyUid}`));
    expect(reqSolved.request.method).toBe('GET');
    reqSolved.flush(dummySolvedData);
  });

  it('should handle multiple blocks of solved bits', () => {
    const dummyUsername = 'testuser';
    const dummyUid = 123;
    const dummySolvedData = [
      {
        solved: [1, 1] // Bits: 0 in first 32-bit int, 0 in second 32-bit int.
        // Problem 0 and Problem 32.
      }
    ];

    service.getSolved(dummyUsername).subscribe((solved) => {
      expect(solved).toEqual([0, 32]);
    });

    const reqUid = httpMock.expectOne(`${service.url}/uname2uid/${dummyUsername}`);
    reqUid.flush(dummyUid);

    const reqSolved = httpMock.expectOne((req) => req.url.startsWith(`${service.url}/solved-bits/${dummyUid}`));
    reqSolved.flush(dummySolvedData);
  });

  it('should return empty list if user does not exist (id = 0)', () => {
    const dummyUsername = 'nonexistent';

    service.getSolved(dummyUsername).subscribe((solved) => {
      expect(solved).toEqual([]);
    });

    const reqUid = httpMock.expectOne(`${service.url}/uname2uid/${dummyUsername}`);
    reqUid.flush(0);

    const reqSolved = httpMock.expectOne((req) => req.url.startsWith(`${service.url}/solved-bits/0`));
    reqSolved.flush([]);
  });
});
