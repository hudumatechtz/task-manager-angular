import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable(
  {providedIn: 'root'}
)

export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackbar(message: any = 'ERROR OCCURRED THE REQUEST FAILED, RETRY AGAIN', action = 'Ok!', duration = 4000): void
  {
    this.snackbar.open(message.toUpperCase(), action, {
      duration,
      horizontalPosition: 'center',
      politeness: 'polite',
      verticalPosition: 'bottom'
    });
  }
}

