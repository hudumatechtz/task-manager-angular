import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UiService} from './ui.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

export interface InputsProductsValues {
  product: string;
  retailPrice: string;
  quantity: string;
  description: string;
  category: string;
  catalog: string;
  image?: File;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://smartfleek-backend.herokuapp.com/shop';
  serverMessage = 'Internal Server Error, Status Code 500';
  homeUrl = 'https://smartfleek-backend.herokuapp.com';
  productSubject = new Subject<any>();
  productsSubject = new Subject<any[]>();
  searchedProductsSubject = new Subject<any[]>();
  categorySubject = new Subject<any>();
  // userData: any;
  // userData = JSON.parse(localStorage.getItem('userData')) ?
  //   JSON.parse(localStorage.getItem('userData')) : {};
  // token = this.userData.authToken ? this.userData.authToken : console.log(this.userData);
  constructor(private http: HttpClient,
              private uiService: UiService,
              private router: Router,
              private route: ActivatedRoute,
              // private authService: AuthService
  ) {
    // this.authService.tokenChanged.subscribe(
    //   value => {
    //       this.token = localStorage.getItem('token');
    //   }
    // );
  }
   // updateToken(): void{
   //  const { authToken } = JSON.parse(localStorage.getItem('userData')) ?
   //    JSON.parse(localStorage.getItem('userData')) : '';
   //  console.log(authToken);
   //  // this.token =  authToken;
   //  // console.log(this.token);
   // }
   getOptions(): object{
    const { authToken } = JSON.parse(localStorage.getItem('userData')) ?
      JSON.parse(localStorage.getItem('userData')) : '';
    return {
       headers: {
         Authorization: `Bearer ${authToken}`
       }
     };
   }
  //   createProduct(inputValues: InputsProductsValues): void {
  //     const options = this.getOptions();
  //     const formData = new FormData();
  //     // console.log(inputValues);
  //     formData.append('product', inputValues.product);
  //     formData.append('description', inputValues.description);
  //     formData.append('image', inputValues.image);
  //     formData.append('category', inputValues.category);
  //     formData.append('catalog', inputValues.catalog);
  //     formData.append('quantity', inputValues.quantity as unknown as string);
  //     formData.append('retailPrice', inputValues.retailPrice as unknown as string);
  //     // console.log(formData.get('image'));
  //     this.http.post<InputsProductsValues>(this.url + '/add-product',
  //       formData, options
  //     ).subscribe(
  //       (result: any) => {
  //         console.log(result);
  //         this.uiService.loadingStateChanged.next(false);
  //         this.uiService.showSnackbar(result.message);
  //       },
  //       error => {
  //         this.uiService.loadingStateChanged.next(false);
  //         error.message ? this.uiService.showSnackbar(this.serverMessage) : this.uiService.showSnackbar(error.error.message);
  //       }
  //     );
  // }
getProducts(): void {
    this.uiService.loadingStateChanged.next(true);
    this.http.get(this.homeUrl + '/products')
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          // console.log(products);
          if (!result){
            this.productsSubject.next([]);
            return this.uiService.showSnackbar('PRODUCTS COULD NOT BE FETCHED, TRY REFRESH YOUR PAGE');
          }
          // for (const product of result.products){
          //   let updatedProduct = product.images.imagePaths;
          //   updatedProduct = [...updatedProduct, this.url];
          //   console.log(updatedProduct);
          // }
          this.productsSubject.next(result.products);
        },
        error => {
          const message = error.error.message ? error.error.message : this.serverMessage;
          this.uiService.showSnackbar(message);
          this.uiService.loadingStateChanged.next(false);
          console.log(error);
        }
      );
  }
  getSpecificProduct(id: string): void{
    this.http.get(this.homeUrl + `/product/${id}`)
    .subscribe(
      (result: any) => {
        // HANDLE ERRORS
        if (!result) {
          this.productSubject.next([]);
          return this.uiService.showSnackbar('PRODUCT COULD NOT BE FETCHED, TRY REFRESH YOUR PAGE');
        }
        this.productSubject.next(result.product);
      },
      error => {
        const message = error.error.message ? error.error.message : this.serverMessage;
        this.uiService.showSnackbar(message);
        console.log(error);
      }
    );
  }
  getUrl(): string{
   return this.homeUrl + '/';
  }
  addToCart(id: string, quantity: number): void{
    // this.token = localStorage.getItem('token');
    const options = this.getOptions();
    // this.updateToken();
    this.uiService.loadingStateChanged.next(true);
    this.http.post(this.homeUrl + '/add-to-cart', {
      productId : id,
      quantity
    }, options).subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar(result.message);
          },
      error => {
            this.uiService.loadingStateChanged.next(false);
            console.log(error);
            if (error.error.notSuccess) {
              return this.router.navigate(['../login'], {relativeTo: this.route});
            }
          }
        );
  }
  searchProduct(): void{
    this.uiService.loadingStateChanged.next(true);
    let searchQuery: any = null;
    this.route.queryParams.subscribe(
      query => {
        searchQuery = query.q;
      }
    );
    if (searchQuery === null){
      searchQuery = ('general' as string);
    }
    this.http.get(this.homeUrl + `/search/${searchQuery}`)
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar(result.message);
          if (result.products == null){
            this.uiService.showSnackbar('REPHRASE YOUR SEARCH AND TRY AGAIN');
            return this.searchedProductsSubject.next([]);
          }
          this.searchedProductsSubject.next(result.products);
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          const message = error.error.message ? error.error.message : this.serverMessage;
          this.uiService.showSnackbar(message);
        }
      );
  }
  getCategories(): void{
    this.http.get(this.url + '/categories')
    .subscribe(
      (result: any) => {
        console.log(result);
        if (result.categories == null){
          return this.uiService.showSnackbar(result.message);
        }
        const theCategories = result.categories[0].categories;
        this.categorySubject.next(Object.keys(theCategories));
      },
      error => {
        console.error(error);
        const message = error.error.message ? error.error.message : this.serverMessage;
        this.uiService.showSnackbar(message);
      }
    );
  }
  getShopProducts(): Observable<any>{
    return this.http.get(this.homeUrl + '/shop-products');
  }
}
