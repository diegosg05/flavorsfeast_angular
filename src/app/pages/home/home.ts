import { Component } from '@angular/core';
import { SwiperComponent } from "../../components/swiper-component/swiper-component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SwiperComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
