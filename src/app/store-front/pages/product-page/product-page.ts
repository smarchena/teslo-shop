import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '@products/services/products.service';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  activatedRoute = inject(ActivatedRoute)
  productsService = inject(ProductService)

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug']

  productResource = rxResource({
    params: () => ({
      idSlug: this.productIdSlug
    }),
    stream: ({params}) => {
      return this.productsService.getProductByIdSlug(params.idSlug)
    }
  })

}
