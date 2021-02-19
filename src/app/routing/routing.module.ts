import { LoginComponent } from '../account/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from '../account/register.component';
import {HomeComponent} from '../task-manager/components/home.component';
import {DashboardComponent} from '../task-manager/components/dashboard.component';
import {TotalTasksComponent} from '../task-manager/components/total-tasks.component';
import {OngoingTasksComponent} from '../task-manager/components/ongoing-tasks.component';
import {QueuedTasksComponent} from '../task-manager/components/queued-tasks.component';
import {CompletedTasksComponent} from '../task-manager/components/completed-tasks.component';
import {TaskComponent} from '../task-manager/components/task.component';
import {TaskManagerComponent} from '../task-manager/components/task-manager.component';
import {TaskFormComponent} from '../task-manager/components/task-form.component';

const routes: Routes = [
  {path: '', component: TaskManagerComponent},
  {path: 'user', component: HomeComponent,
    children: [
      {path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'tasks', component: TaskComponent,
        children: [
          {path: '', component: TotalTasksComponent, pathMatch: 'full'},
          {path: 'add-task', component: TaskFormComponent},
          {path: 'ongoing-tasks', component: OngoingTasksComponent},
          {path: 'queued-tasks', component: QueuedTasksComponent},
          {path: 'completed-tasks', component: CompletedTasksComponent}
        ]
      },
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
