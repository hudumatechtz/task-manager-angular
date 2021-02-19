import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface Auth {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:5000/account';
  serverMessage = 'Internal Server Error, Status Code 500';
  useSubject = new Subject();
  userSubject = new BehaviorSubject<any>(null);
  getOptions(): object{
    const {token}  = JSON.parse(localStorage.getItem('userData')) ?
      JSON.parse(localStorage.getItem('userData')) : '';
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  constructor(
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
  }

  register(authData: Auth): void {
    this.uiService.loadingStateChanged.next(true);
    this.http.post<Auth>(this.url + '/register', {
      username: authData.username,
      password: authData.password,
    })
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          // console.log(result);
          if (result.registration) {
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
      username: authInfo.username,
      password: authInfo.password
    })
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!result.isLoggedIn) {
            this.uiService.showSnackbar(result.message);
            return this.router.navigate(['../login'], {relativeTo: this.route});
          }
          const user = {
            token: result.token,
            username: result.username
          };
          localStorage.setItem('userData', JSON.stringify(user));
          return this.router.navigate(['../user']);
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
          console.log(error);
        }
      );
  }

  logout(): any {
    this.uiService.loadingStateChanged.next(false);
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    this.uiService.showSnackbar('LOGOUT WAS SUCCESSFULLY');
    return this.router.navigate(['/']);
  }
  updateUser(username: string): void
  {
    this.uiService.loadingStateChanged.next(true);
    const options = this.getOptions();
    this.http.post(this.url + '/update-user', {
      username
    }, options).subscribe(
      (response: any) => {
        this.uiService.loadingStateChanged.next(false);
        const user = JSON.parse(localStorage.getItem('userData'));
        user.username = response.username;
        localStorage.setItem('userData', JSON.stringify(user));
        this.uiService.showSnackbar(response.message);
        return this.router.navigate(['../user']);
      },
      error => {
        this.uiService.loadingStateChanged.next(false);
        error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        console.log(error);
      }
    );
  }
}
