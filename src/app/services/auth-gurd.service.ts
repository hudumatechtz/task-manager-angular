import {Injectable} from '@angular/core';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {UiService} from './ui.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{
  authState: Observable<firebase.User | null>;
  constructor(private authService: AuthService,
              private router: Router,
              private uiService: UiService) {
  }
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot,
              ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    // this.authService.authChanged.subscribe(
    //   authStatus => {
    //     return authStatus;
    //   }
    // );
    // this.router.navigate(['/login'])
    //   .catch(error => this.uiService.showSnackbar(error.message));
    return true;
  }
}
