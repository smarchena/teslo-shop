import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
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
