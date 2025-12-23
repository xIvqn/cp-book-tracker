import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { BookService } from './services/book.service';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const bSpy = jasmine.createSpyObj('BookService', ['getBook']);
    const uSpy = jasmine.createSpyObj('UserService', ['getSolved']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [
        { provide: BookService, useValue: bSpy },
        { provide: UserService, useValue: uSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'CP Book Tracker'`, () => {
    expect(component.title).toEqual('CP Book Tracker');
  });

  it('should initialize problems on ngOnInit', () => {
    const dummyProblems = [
      [1, 100, 'Problem 100', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    bookServiceSpy.getBook.and.returnValue(of([]));

    component.ngOnInit();

    const req = httpMock.expectOne('https://uhunt.onlinejudge.org/api/p');
    req.flush(dummyProblems);

    expect(component.problems.has(100)).toBeTrue();
    expect(component.problemNums.get(1)).toBe(100);
    expect(bookServiceSpy.getBook).toHaveBeenCalledWith(3, component.problems);
  });

  it('should update book on selectEdition', () => {
    const mockBook = [{ title: 'Ch 1', solved: 1, total: 2, sections: [], id: '1' } as any];
    bookServiceSpy.getBook.and.returnValue(of(mockBook));

    component.selectEdition(4);

    expect(component.bookEdition).toBe(4);
    expect(component.book).toEqual(mockBook);
    expect(component.solved).toBe(1);
    expect(component.total).toBe(2);
  });

  it('should update solved problems on selectUser', () => {
    // Setup initial problems
    component.problems.set(100, { pid: 1, solved: false } as any);
    component.problemNums.set(1, 100);
    component.book = [
      {
        title: 'Ch 1',
        solved: 0,
        total: 1,
        sections: [
          {
            title: 'Sec 1',
            solved: 0,
            total: 1,
            problemSets: [
              {
                title: 'Set 1',
                solved: 0,
                total: 1,
                problems: [component.problems.get(100)!]
              }
            ]
          }
        ],
        id: '1'
      }
    ];

    userServiceSpy.getSolved.and.returnValue(of([1])); // Problem pid 1 solved

    const mockForm = { value: { user: 'testuser' } } as any;
    component.selectUser(mockForm);

    expect(component.user).toBe('testuser');
    expect(component.problems.get(100)?.solved).toBeTrue();
    expect(component.book[0].solved).toBe(1);
    expect(component.book[0].sections[0].solved).toBe(1);
  });
});
