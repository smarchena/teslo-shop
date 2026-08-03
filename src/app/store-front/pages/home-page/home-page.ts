import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})

export class HomePage {
  productsService = inject(ProductService)

  productsResource = rxResource({
    params: () => ({}),
    stream: ( {params} ) => {
      return this.productsService.getProducts({})
    }
  })

}
