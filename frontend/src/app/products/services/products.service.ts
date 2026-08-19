import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, tap, of, delay, map, forkJoin, switchMap } from 'rxjs';
import { environment } from '@environments/environment';

const baseUrl = environment.baseUrl

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient)

  private productsCache = new Map<string, ProductsResponse>()

  private productCache = new Map<string, Product>()

  getProducts(options: Options): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options

    // console.log(this.productsCache.entries())

    const key = `${limit}-${offset}-${gender}`
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    //verificar productos localStorage
    // const productsStorage = localStorage.getItem('products')

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
      // tap(resp => console.log(resp)),
      tap(resp => this.productsCache.set(key, resp))
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

    const key = `${idSlug}`
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        // delay(2000),
        // tap(resp => console.log(resp)),
        tap(resp => this.productCache.set(key, resp))
      )
  }

  getProductById(id: string): Observable<Product> {

    if (id === 'new') {
      return of(emptyProduct)
    }

    const key = `${id}`
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`)
      .pipe(
        tap(resp => this.productCache.set(key, resp))
      )
  }

  updateProduct(id: string, productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {

    const currentImages = productLike.images ?? []

    return this.uploadImages(imageFileList)
      .pipe(
        map(imageNames => ({
          ...productLike,
          images: [...currentImages, ...imageNames]
        })),
        switchMap((updatedProduct) => this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)),
        tap((product) => this.updateProductCache(product))
      )

    /*  return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike)
       .pipe(
         tap((product) => this.updateProductCache(product))
       ) */
  }


  createProduct(productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, productLike)
      .pipe(
        tap((product) => this.updateProductCache(product))
      )
  }

  updateProductCache(product: Product) {
    const productId = product.id

    this.productCache.set(productId, product)

    this.productsCache.forEach(productResponse => {
      productResponse.products = productResponse.products.map((currentProduct) => {
        return currentProduct.id === productId ? product : currentProduct
      })
    })

    console.log('Cache actualizado.')
  }
  // toma un FileList y lo sube
  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([])

    const uploadObservables = Array.from(images)
      .map(imageFile => this.uploadImage(imageFile))

    return forkJoin(uploadObservables).pipe(
      // tap(imageName => console.log({ imageName }))
    )
  }

  uploadImage(imageFile: File): Observable<string> {

    const formData = new FormData()
    formData.append('file', imageFile)

    return this.http.post<{ fileName: string }>(`${baseUrl}/files/product`, formData)
      .pipe(
        map((resp) => resp.fileName)
      )

  }
}
