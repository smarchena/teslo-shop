import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';


@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute)
  productsService = inject(ProductService)
  PaginationService = inject(PaginationService)


  gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ))

  //   currentPage = toSignal(
  //   this.activaredRoute.queryParamMap.pipe(
  //     map(params => params.get('page') ? +params.get('page')! : 1),
  //     map(page => (isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue: 1
  //   }
  // )

  productsResource = rxResource({
    params: () => ({ page: this.PaginationService.currentPage() - 1,
      gender: this.gender()
    }),
    stream: ( {params} ) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9
      })
    }
  })
}
