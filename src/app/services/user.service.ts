import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {UiService} from './ui.service';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  url = 'https://smartfleek-backend.herokuapp.com';
  serverMessage = 'Internal Server Error, Status Code 500';
  userUrl = 'https://smartfleek-backend.herokuapp.com/user';
  cartChanged = new Subject();
  constructor(
    private productService: ProductService,
    private uiService: UiService,
    private http: HttpClient
  ){}
  getOptions(): object {
    const {authToken} = JSON.parse(localStorage.getItem('userData')) ?
      JSON.parse(localStorage.getItem('userData')) : '';
    return {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };
  }
 getCart(): void{
    const options = this.getOptions();
    this.uiService.loadingStateChanged.next(true);
    this.http.get(this.userUrl + '/cart', options)
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!result){
            return;
          }
          const userCart = [];
          result.cart.forEach((cart: any) => {
            const modifiedCart = {...cart.productId};
            modifiedCart.quantity = cart.quantity;
            userCart.push(modifiedCart);
          });
          this.cartChanged.next(userCart);
          // this.uiService.showSnackbar(result.message);
          // console.log(result);
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          const message = error.error.message ? error.error.message : this.serverMessage;
          // this.uiService.showSnackbar(message);
        }
      );
 }
}
