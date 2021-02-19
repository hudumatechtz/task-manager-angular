import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UiService} from './ui.service';
@Injectable(
  {providedIn: 'root'}
)
export class TaskService {
  constructor(private http: HttpClient, private uiService: UiService) {
  }
  dashBoardTasks = new Subject();
  serverMessage = 'Internal server error, 500';
  url = 'http://localhost:5000';
  getOptions(): object{
    const {token}  = JSON.parse(localStorage.getItem('userData')) ?
      JSON.parse(localStorage.getItem('userData')) : '';
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  getDashboardTasks(): void{
    this.uiService.loadingStateChanged.next(true);
    const options = this.getOptions();
    this.http.get(this.url + '/dashboard', options).subscribe(
      (result: any) => {
        this.uiService.loadingStateChanged.next(false);
        if (!result){
          return this.uiService.showSnackbar(result.message);
        }
        this.dashBoardTasks.next(result);
      }
      ,
      error => {
        console.log(error);
        this.uiService.loadingStateChanged.next(false);
        error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
      }
    );
  }
}

