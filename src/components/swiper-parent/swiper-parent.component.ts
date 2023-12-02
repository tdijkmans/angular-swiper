import { Component, ViewChild } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  selector: 'app-swiper-parent',
  templateUrl: './swiper-parent.component.html',
  styleUrls: ['./swiper-parent.component.sass'],
  standalone: true,
  imports: [SwiperComponent]
})
export class SwiperParentComponent {
  slides = [
    { title: 'Slide 1', body: 'Content', footer: 'Footer of 1' },
    {
      title: 'Slide 2', body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec ligula in est scelerisque lacinia ut quis lectus. Integer eleifend diam ut erat tincidunt commodo. Nunc eleifend dui tellus, sit amet eleifend magna elementum eu. Nulla at nulla enim. Morbi condimentum nunc at orci facilisis, et tincidunt ante tincidunt. Integer eget venenatis leo. Nulla in risus rhoncus, mollis lacus eu, lobortis turpis. Aenean elementum felis eget sodales pulvinar.`
      , footer: 'Footer of 2'
    },
    { title: 'Slide 3', body: 'Content', footer: 'Footer of 3' },
    { title: 'Slide 4', body: 'Content', footer: 'Footer of 4' },
    { title: 'Slide 5', body: 'Content', footer: 'Footer of 5' },
  ];


  @ViewChild('swiperRef') swiperRef!: SwiperComponent
  currentIndex = 0;

  constructor() { }

  triggerSwipeNext(): void {
    this.swiperRef.swipeNext();

  }

  triggerSwipePrev(): void {
    this.swiperRef.swipePrev();
  }


  slideTo(index: number): void {
    this.swiperRef.swipeTo(index);

  }

  onSlideChanged(newIndex: number): void {
    console.log('Current Slide Index in Parent:', newIndex);
  }
}
