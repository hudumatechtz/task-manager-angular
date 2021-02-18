import { LoginComponent } from '../account/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from '../account/register.component';
import {HomeComponent} from '../task-manager/components/home.component';
import {DashboardComponent} from '../task-manager/components/dashboard.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'total-tasks', component: LoginComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
