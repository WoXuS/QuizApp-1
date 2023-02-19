import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTgxOGVmYi1mMjhmLTQ0ODYtYTc4NC05ZjFlYjQ0ZjUxZTEiLCJuYW1lIjoiYWRtaW4iLCJqdGkiOiIxNjdjNWU1Zi1lODA2LTQ0MDItODQ1Mi0wNzE4ZjdmM2I2NDgiLCJyb2xlIjpbIkFkbWluIiwiVXNlciJdLCJuYmYiOjE2NzY4MzcyODYsImV4cCI6MTY3Njg3MzU4NiwiaWF0IjoxNjc2ODM3Mjg2fQ.gDUPke7sM0tCcsWMlf45tg2FKle2NbCIAzKquqKwkyU"; // todo

    if (!!token) {
      req = this.handleToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
          // todo refresh token
        }
        return throwError(() => error);
      })
    );
  }

  private handleToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // todo
      throw new Error();
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => next.handle(this.handleToken(request, jwt)))
      );
    }
  }
}
