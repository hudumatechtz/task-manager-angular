import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { Shop } from '../models/shop.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ProductService} from './product.service';
import {User} from '../models/user.model';
export interface Auth {
  email: string;
  password: string;
  mobile?: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  expirationTime: number = null;
  url = 'https://smartfleek-backend.herokuapp.com/account';
  serverMessage = 'Internal Server Error, Status Code 500';
  userSubject = new BehaviorSubject<User>(null);
  authChanged = new Subject<boolean>();
  private previousUrl: string;
  private currentUrl: string;
  constructor(
    private uiService: UiService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }
  public getPreviousUrl(): any {
    if (this.previousUrl === '/account/user'
      || this.previousUrl === '/reset-password'
      || this.previousUrl === '/account/register'
      || this.previousUrl.includes('search')
      || this.previousUrl.includes('shop')) {
      return '/';
    }else {
      return this.previousUrl;
    }
  }
  isAuth(): boolean {
    return this.isAuthenticated;
  }
  registerShop(shopInfo: Shop, authInfo: Auth): void {
    this.uiService.loadingStateChanged.next(true);
    this.http.post(this.url + '/register', {
      firstName: shopInfo.firstname,
      lastName: shopInfo.lastname,
      email: shopInfo.email,
      mobileNumber: shopInfo.mobilePhone,
      shopName: shopInfo.shopName,
      shopRegion: shopInfo.shopRegion,
      shopLocation: shopInfo.shopLocation,
      shopCategory: shopInfo.shopCategory,
      username: authInfo.email,
      password: authInfo.password
    }).subscribe(
      (result: any) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(`${result.message.toString()} YOU ARE REDIRECTED INTO 2 SECONDS`);
        setTimeout(() => {
          return this.router.navigate(['../login']);
        }, 2000);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        error.message ? this.uiService.showSnackbar(this.serverMessage) : this.uiService.showSnackbar(error.error.message);
      }
    );
  }
  registerUser(authData: Auth, username?): void {
    this.uiService.loadingStateChanged.next(true);
    this.http.post<Auth>(this.url + '/signup', {
      email: authData.email,
      password: authData.password,
      username: username ? username : authData.email.slice(0, authData.email.indexOf('@')),
      mobile: authData.mobile,
    })
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          // console.log(result);
          if (result.success) {
            this.uiService.showSnackbar(`${result.message.toString()} YOU ARE REDIRECTED INTO 2 SECONDS`);
            return setTimeout(() => this.router.navigate(['../login']), 2500);
          }
          this.uiService.showSnackbar(result.message);
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
          // this.uiService.showSnackbar(error.error.message);
          console.log(error);
        }
      );
  }
  login(authInfo: Auth): void {
    this.uiService.loadingStateChanged.next(true);
    this.http.post(this.url + '/login', {
      email: authInfo.email,
      password: authInfo.password
    })
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!result.isLoggedIn){
            this.uiService.showSnackbar(result.message);
            return this.router.navigate(['../login'], { relativeTo: this.route });
          }
          if (result.shopId) {
            console.log(result);
            const shop = {email: result.email, token : result.token};
            localStorage.setItem('shopData', JSON.stringify(shop));
            return this.router.navigate(['../shop'], { relativeTo: this.route });
          }
          const expiresIn = +result.expiresIn;
          const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
          const user = new User(result.email, result.token, expirationDate, result.username);
          this.userSubject.next(user);
          this.autoLogout(+result.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
          // this.productService.updateToken();
          if (result.customerId) {
            this.authChanged.next(true);
            // return this.router.navigate(['/']);
            return this.router.navigate([this.getPreviousUrl()]);
          }
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
          console.log(error);
        }
      );
  }
  autoLogin(): void{
    const userData: {
      email: string;
      authToken: string;
      tokenExpirationDate: string,
      username: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.authToken,
      new Date(userData.tokenExpirationDate),
      userData.username,
    );
    if (loadedUser.token){
      this.userSubject.next(loadedUser);
      const expiresIn = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expiresIn);
      this.autoLogout(expiresIn);
    }
  }
  logout(shop = null): any{
    this.uiService.loadingStateChanged.next(false);
    console.log(shop);
    if (shop != null){
      localStorage.removeItem('shopData');
      return this.router.navigate(['../login']);
    }
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    // this.productService.updateToken();
    if (this.expirationTime){
      clearTimeout(this.expirationTime);
    }
    this.expirationTime = null;
    return this.router.navigate(['/']);
  }
  autoLogout(expirationTime: number): void{
    setTimeout(() => {
      this.logout();
    }, expirationTime);
  }
  // registerShop(authInfo: Auth, shopInfo: Shop): void
  // {
  //   this.uiService.loadingStateChanged.next(true);
  //   this.auth.createUserWithEmailAndPassword(authInfo.email, authInfo.password)
  //     .then(results => {
  //       this.uiService.loadingStateChanged.next(false);
  //       this.saveShopInfo({...shopInfo, shopId: results.user.uid});
  //     })
  //     .catch(error => {
  //       this.uiService.loadingStateChanged.next(false);
  //       this.uiService.showSnackbar(error.message);
  //     });
  // }
  // saveShopInfo(shopInfo: Shop): void
  // {
  //   this.firestore.collection(shopInfo.email).add(shopInfo)
  //     .catch( error => this.uiService.showSnackbar(error.message));
  // }
  // login(authInfo: Auth): void
  // {
  //   this.uiService.loadingStateChanged.next(true);
  //   this.auth.signInWithEmailAndPassword(
  //     authInfo.email,
  //     authInfo.password,
  //   ).then(results => {
  //     this.uiService.loadingStateChanged.next(false);
  //     this.router.navigate(['../shop'], {relativeTo: this.route})
  //       .catch(error => this.uiService.showSnackbar(error.message));
  //   })
  //     .catch(error => {
  //       this.uiService.loadingStateChanged.next(false);
  //       this.uiService.showSnackbar(error.message);
  //     });
  // }
  // logout(): void
  // {
  //   this.uiService.loadingStateChanged.next(false);
  //   this.auth.signOut().then(results => {
  //     this.router.navigate(['/login'])
  //       .catch(error => this.uiService.showSnackbar(error.message));
  //   })
  //     .catch(error => this.uiService.showSnackbar(error.message));
  // }
  // autoLogout(): void{
  //   setTimeout(() => {
  //     this.logout();
  //   }, this.expirationTime);
  // }
  // isAuth(): boolean
  // {
  //   return this.isAuthenticated;
  // }
  // authListener(): void
  // {
  //   this.auth.authState.subscribe(
  //     user => {
  //       if (user){
  //         this.isAuthenticated = true;
  //         this.authChanged.next(true);
  //         this.userChanged.next(user);
  //       }else {
  //         this.isAuthenticated = false;
  //         this.authChanged.next(false);
  //         this.userChanged.next(null);
  //       }
  //     }
  //   );
  // }
}
