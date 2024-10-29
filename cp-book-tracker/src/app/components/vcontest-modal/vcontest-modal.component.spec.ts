import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcontestModalComponent } from './vcontest-modal.component';

describe('VcontestModalComponent', () => {
  let component: VcontestModalComponent;
  let fixture: ComponentFixture<VcontestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcontestModalComponent]
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
