import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UiService} from './ui.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {InputsProductsValues} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  url = 'https://smartfleek-backend.herokuapp.com/shop';
  serverMessage = 'Internal Server Error, Status Code 500';
  homeUrl = 'https://smartfleek-backend.herokuapp.com';
  productsChanged = new Subject();
  constructor(
    private http: HttpClient,
    private uiService: UiService,
  ) { }
  getOptions(): object{
    const {token}  = JSON.parse(localStorage.getItem('shopData')) ?
      JSON.parse(localStorage.getItem('shopData')) : '';
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  createProduct(inputValues: InputsProductsValues): void {
    const options = this.getOptions();
    const formData = new FormData();
    // console.log(inputValues);
    formData.append('product', inputValues.product);
    formData.append('description', inputValues.description);
    formData.append('image', inputValues.image);
    formData.append('category', inputValues.category);
    formData.append('catalog', inputValues.catalog);
    formData.append('quantity', inputValues.quantity as unknown as string);
    formData.append('retailPrice', inputValues.retailPrice as unknown as string);
    // console.log(formData.get('image'));
    this.http.post<InputsProductsValues>(this.url + '/add-product',
      formData, options
    ).subscribe(
      (result: any) => {
        console.log(result);
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(result.message);
      },
      error => {
        this.uiService.loadingStateChanged.next(false);
        error.message ? this.uiService.showSnackbar(this.serverMessage) : this.uiService.showSnackbar(error.error.message);
      }
    );
  }
  getProducts(): void {
    this.uiService.loadingStateChanged.next(true);
    const options = this.getOptions();
    this.http.get(this.url + '/shop-products', options)
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (result.products == null){
            return this.productsChanged.next([]);
          }
          this.productsChanged.next(result.products);
        },
      error => {
          this.uiService.loadingStateChanged.next(false);
          console.log(error);
      });
  }
}
