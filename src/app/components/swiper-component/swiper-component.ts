import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild } from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

@Component({
  selector: 'app-swiper-component',
  imports: [],
  templateUrl: './swiper-component.html',
  styleUrl: './swiper-component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent {
  @ViewChild('swiperContainer') swiperContainerElement!: ElementRef<SwiperContainer>;
  swiperElement = signal<SwiperContainer | null>(null);
  
  ngAfterViewInit() {
    const swiperElemConstructor = this.swiperContainerElement.nativeElement;
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      pagination: {
        enabled: true,
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        enabled: true,
        nextEl: '.arrow-button-next',
        prevEl: '.arrow-button-prev',
      },
      autoplay: {
        delay: 3000,
      },
      loop: true,
      speed: 500
    }
    Object.assign(swiperElemConstructor, swiperOptions);
    this.swiperElement.set(swiperElemConstructor);
    this.swiperElement()?.initialize();
  }
}
