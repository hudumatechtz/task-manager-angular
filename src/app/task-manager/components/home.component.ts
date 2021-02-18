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
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon matListIcon>dashboard</mat-icon>
            Dashboard
          </a>
          <a mat-list-item routerLink="/tasks" routerLinkActive="active">
            <mat-icon matListIcon>task</mat-icon>
            Tasks
          </a>
          <a mat-list-item routerLink="/account" routerLinkActive="active">
            <mat-icon matListIcon>account_circle</mat-icon>
            Tasks
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content style="min-height: 100vh">
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="sidenav.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Sidenav toggle icon">menu</mat-icon>
          </button>
          <span>Task Manager System</span>
        </mat-toolbar>
        <router-outlet></router-outlet>
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
