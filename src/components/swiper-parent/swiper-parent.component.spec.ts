import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperParentComponent } from './swiper-parent.component';

describe('SwiperParentComponent', () => {
  let component: SwiperParentComponent;
  let fixture: ComponentFixture<SwiperParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwiperParentComponent]
    });
    fixture = TestBed.createComponent(SwiperParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
