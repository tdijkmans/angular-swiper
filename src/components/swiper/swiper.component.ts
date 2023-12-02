import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.sass'],
  imports: [CommonModule],
  standalone: true
})
export class SwiperComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('swiperWrapper') swiperWrapper!: ElementRef;

  @Input() currentIndex = 0; // Input to set the initial index from the parent component
  @Output() currentIndexChange = new EventEmitter<number>();

  private startX: number | null = null;
  private highlightTimeout: any; // Timeout variable for removing the highlight

  @Input() slides: Array<{ title: string; body: string; footer: string }> = [];

  constructor(private renderer: Renderer2) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateSwiperPosition();
  }


  ngAfterViewInit(): void {
    this.updateSwiperPosition();
  }

  swipeNext(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.updateSwiperPosition();

    }
  }

  swipePrev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSwiperPosition();

    }
  }

  swipeTo(index: number): void {
    this.currentIndex = index;
    this.updateSwiperPosition();

  }

  updateSwiperPosition(): void {
    const slideWidth = this.calculateEffectiveSlideWidth();
    const newPosition = -this.currentIndex * slideWidth;
    this.renderer.setStyle(this.swiperWrapper.nativeElement, 'transform', `translateX(${newPosition}px)`);
    this.currentIndexChange.emit(this.currentIndex);
  }

  calculateEffectiveSlideWidth(): number {
    const slideElement = this.swiperWrapper.nativeElement.querySelector('.swiper-slide');
    const slideWidth = slideElement.offsetWidth;

    // Get the left and right margins of the slide
    const marginLeft = parseInt(getComputedStyle(slideElement).marginLeft, 10) || 0;
    const marginRight = parseInt(getComputedStyle(slideElement).marginRight, 10) || 0;

    // Calculate the effective width including margins
    const effectiveSlideWidth = slideWidth + marginLeft + marginRight;

    return effectiveSlideWidth;
  }


  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    if (this.startX !== null) {
      const deltaX = event.touches[0].clientX - this.startX;
      const slideWidth = this.calculateEffectiveSlideWidth();
      const newPosition = -this.currentIndex * slideWidth + deltaX;
      this.renderer.setStyle(this.swiperWrapper.nativeElement, 'transform', `translateX(${newPosition}px)`);
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.startX !== null) {
      const deltaX = event.changedTouches[0].clientX - this.startX;
      const sensitivity = 50; // Adjust this value based on how sensitive you want the swipe to be

      if (Math.abs(deltaX) > sensitivity) {
        if (deltaX > 0) {
          this.swipePrev();
        } else {
          this.swipeNext();
        }
      }

      this.startX = null;
      this.updateSwiperPosition();
    }
  }

  onSlideClick(event: Event): void {
    // Prevent the click event from propagating up to the parent container
    event.stopPropagation();
  }

  onLeftClick(event: Event): void {
    event.stopPropagation();
    this.swipePrev();
  }

  onRightClick(event: Event): void {
    event.stopPropagation();
    this.swipeNext();
  }


}