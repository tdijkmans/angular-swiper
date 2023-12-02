import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SwiperParentComponent } from 'src/components/swiper-parent/swiper-parent.component';
import { SwiperComponent } from 'src/components/swiper/swiper.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SwiperComponent,
    SwiperParentComponent,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
