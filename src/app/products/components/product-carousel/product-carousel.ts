import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';


@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarousel implements AfterViewInit {

  images = input.required<string[]>()
  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  ngAfterViewInit(): void {

    const element = this.swiperDiv().nativeElement
    if (!element) return

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }



}
