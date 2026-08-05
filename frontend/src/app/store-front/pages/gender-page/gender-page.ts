import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute)
  productsService = inject(ProductService)

  gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ))

  productsResource = rxResource({
    params: () => ({
      gender: this.gender()
    }),
    stream: ( {params} ) => {
      return this.productsService.getProducts({gender: params.gender})
    }
  })
}
