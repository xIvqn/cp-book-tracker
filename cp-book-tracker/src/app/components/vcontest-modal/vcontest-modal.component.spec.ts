import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { VcontestModalComponent } from './vcontest-modal.component';
import { UserService } from 'src/app/services/user.service';
import { BookService } from 'src/app/services/book.service';
import { VcontestService } from 'src/app/services/vcontest.service';

describe('VcontestModalComponent', () => {
  let component: VcontestModalComponent;
  let fixture: ComponentFixture<VcontestModalComponent>;

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['getId']);
    const bookSpy = jasmine.createSpyObj('BookService', ['getBook']);
    const vcontestSpy = jasmine.createSpyObj('VcontestService', ['createVcontest']);

    // Mock the public book property accessed in selectProblemNums
    bookSpy.book = [];

    await TestBed.configureTestingModule({
      imports: [VcontestModalComponent, FormsModule],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: BookService, useValue: bookSpy },
        { provide: VcontestService, useValue: vcontestSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VcontestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
