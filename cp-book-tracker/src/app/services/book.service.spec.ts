import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Problem } from '../models/problem.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build the book structure correctly', () => {
    const problems = new Map<number, Problem>();
    problems.set(100, { pid: 1, num: 100, title: 'Prob 1', solved: true } as any);
    problems.set(200, { pid: 2, num: 200, title: 'Prob 2', solved: false } as any);

    const dummyBookData = [
      {
        title: 'Chapter 1',
        arr: [
          {
            title: 'Section 1.1',
            arr: [
              ['Set 1.1.1', 100, -200] // -200 means starred
            ]
          }
        ]
      }
    ];

    service.getBook(3, problems).subscribe((book) => {
      expect(book.length).toBe(1);
      expect(book[0].title).toBe('Chapter 1');
      expect(book[0].solved).toBe(1);
      expect(book[0].total).toBe(2);
      expect(book[0].sections.length).toBe(1);
      expect(book[0].sections[0].title).toBe('Section 1.1');
      expect(book[0].sections[0].problemSets.length).toBe(1);
      expect(book[0].sections[0].problemSets[0].title).toBe('Set 1.1.1');
      expect(book[0].sections[0].problemSets[0].problems.length).toBe(2);
      expect(book[0].sections[0].problemSets[0].problems[0].num).toBe(100);
      expect(book[0].sections[0].problemSets[0].problems[1].num).toBe(200);
      expect(book[0].sections[0].problemSets[0].problems[1].starred).toBe(true);
    });

    const req = httpMock.expectOne(`${service.url}/3`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBookData);
  });

  it('should handle problems not found in the map', () => {
    const problems = new Map<number, Problem>();
    // Problem 100 is missing from the map

    const dummyBookData = [
      {
        title: 'Chapter 1',
        arr: [
          {
            title: 'Section 1.1',
            arr: [
              ['Set 1.1.1', 100]
            ]
          }
        ]
      }
    ];

    service.getBook(3, problems).subscribe((book) => {
      expect(book[0].sections[0].problemSets[0].problems.length).toBe(0);
      expect(book[0].solved).toBe(0);
      expect(book[0].total).toBe(0); // total is based on built problems
    });

    const req = httpMock.expectOne(`${service.url}/3`);
    req.flush(dummyBookData);
  });
});
