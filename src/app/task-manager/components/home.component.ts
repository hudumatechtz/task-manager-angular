import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav class="sidenav" fixedInViewport
                   [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
                   [mode]="(isHandset$ | async) ? 'over' : 'side'"
                   [opened]="(isHandset$ | async) === false"
                   style="width: 250px; overflow: hidden">
        <mat-toolbar fxLayoutAlign="center center" style="margin-top: 150px">
          Task Manager
        </mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/user/dashboard" routerLinkActive="active">
            <mat-icon matListIcon>dashboard</mat-icon>
            Dashboard
          </a>
          <a mat-list-item routerLink="/user/tasks" routerLinkActive="active">
            <mat-icon matListIcon>task</mat-icon>
            Tasks
          </a>
          <a mat-list-item routerLink="/user/account" routerLinkActive="active">
            <mat-icon matListIcon>account_circle</mat-icon>
            Tasks
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content style="min-height: 100vh">
        <mat-toolbar color="primary" fxLayout="row">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="sidenav.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Sidenav toggle icon">menu</mat-icon>
          </button>
          <div >
            <div>
              Task Manager System
            </div>
          </div>
          <div style="margin-left: auto; color: white">
            <span>{{username}}</span>
            <mat-icon>account_circle</mat-icon>
          </div>
        </mat-toolbar>
        <router-outlet></router-outlet>
        <div style="position: absolute; bottom: 50px; right: 50px; background: var(--color-theme);
         color: var(--light-theme); border-radius: 50%; height: 70px; width: 70px">
          <a routerLink="/user/add-task" mat-icon-button>
            <mat-icon style="margin-top: 23px; font-size: 40px; margin-right: 15px">add</mat-icon>
          </a>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
    }
    .sidenav {
      width: 200px;
    }
    .sidenav .mat-toolbar {
      background: inherit;
    }
    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .mat-icon-button {
      height: 70px !important;
      width: 70px !important;
    }
    .mat-icon-button:hover {
      color: var(--light-theme);
    }
    mat-sidenav{
      height: 100vh;
    }
    mat-nav-list {
      width: 100%;
      text-align: center;
    }
    mat-nav-list a {
      margin:0;
      padding: 0;
      font-size: 18px;
      height: 56px;
    }
    .mat-nav-list a mat-icon {
      margin-right: 16px;
    }
    mat-nav-list a:hover {
      background: #e9e9e9;
    }
    mat-nav-list a.active:hover {
      background: var(--color-theme);
    }
    .active, .active:active, .active:focus {
      background: var(--color-theme);
      color: var(--light-theme);
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }
  `]
})
export class HomeComponent implements OnInit{
  username = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) {
  }
  ngOnInit(): void {
  }
}
