import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private notifier: NotifierService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.userService.logout();
          this.notifier.notify('error', 'Authorization error');
        }
        return throwError(error);
      })
    )
  }
}
