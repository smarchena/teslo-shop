import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, tap, of } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient)


  getProducts(options: Options): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options

    //verificar productos localStorage
    const productsStorage = localStorage.getItem('products')

    /* if (productsStorage) { //si existen
      console.log('Productos cargados desde el localStorage')
      return of(JSON.parse(productsStorage))
    } */

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, { //si no existen
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    }).pipe(
      tap(resp => console.log(resp))
      /* tap(resp => {
        localStorage.setItem('products',
        JSON.stringify(resp))
        console.log('Productos guardados en localstorage traidos de la API')
      }) */
    )
  }

  /* getImages(imageName: string) {
    return this.http.get<Product[]>(`${baseUrl}/api/files/product/${imageName}`)
  } */

  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
    /* .pipe(
      tap(resp => console.log(resp))
    ) */
  }

}
