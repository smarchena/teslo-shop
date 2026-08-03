import { SlicePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '@products/services/products.service';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  productsService = inject(ProductService)
  product = input.required<Product>()

  imageUrl = computed(() => {
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`
  })
}
