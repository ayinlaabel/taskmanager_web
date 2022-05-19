import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../services/auth.service";

@Injectable()
export class WebReqInterceptor implements HttpInterceptor {
  messages: any;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Handle the Request
    request = this.addAuthHeader(request);

    //Call next() and handle response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const err = error;

        if (error.status === 0) {
          //0 error so we are not connected yet
          this.messages =
            "Check your internet connection / Contact Administrator.";
          const msg = this.messages;
          // this.toastService.sendMessage(msg)
          this.toastr.error(msg);
          this.authService.logout();
        }

        if (error.status === 403) {
          this.toastr.error(err.error);
          this.authService.logout();
        }

        //Getting Unauthorized Access
        if (error.status === 401) {
          //401 error so we are unauthorised

          //refresh the access token
          this.messages = "Session has expired, you need to login.";
          const msg = this.messages;
          // this.toastService.sendMessage(msg)
          this.toastr.error(msg);
          this.authService.logout();
        }

        return throwError(error);
      })
    );
  }

  addAuthHeader(request: HttpRequest<any>) {
    //Get Access Token
    const token = this.authService.getAccessToken();

    if (token) {
      //Append the access token to the request header
      return request.clone({
        setHeaders: {
          token: token,
        },
      });
    }
    return request;
  }
}
