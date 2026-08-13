import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '@shared/components/pagination/pagination';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})

export class HomePage {
  productsService = inject(ProductService)
  paginationService = inject(PaginationService)

  // activaredRoute = inject(ActivatedRoute)

  // currentPage = toSignal(
  //   this.activaredRoute.queryParamMap.pipe(
  //     map(params => params.get('page') ? +params.get('page')! : 1),
  //     map(page => (isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue: 1
  //   }
  // )

  productsResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1}), //se resta para que la ultima pagina no salga vacía, vamos de 9 en 9
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9
      })
    }
  })

}
