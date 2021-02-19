import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomeComponent} from './task-manager/components/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {DashboardComponent} from './task-manager/components/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {CompletedTasksComponent} from './task-manager/components/completed-tasks.component';
import {QueuedTasksComponent} from './task-manager/components/queued-tasks.component';
import {OngoingTasksComponent} from './task-manager/components/ongoing-tasks.component';
import {TotalTasksComponent} from './task-manager/components/total-tasks.component';
import {TaskComponent} from './task-manager/components/task.component';
import {TaskManagerComponent} from './task-manager/components/task-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    CompletedTasksComponent,
    QueuedTasksComponent,
    OngoingTasksComponent,
    TotalTasksComponent,
    TaskComponent,
    TaskManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserModule,
    MatFormFieldModule,
    RoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    MatInputModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
