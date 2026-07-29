import { Component } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {}
