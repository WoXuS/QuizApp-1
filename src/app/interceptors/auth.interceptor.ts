import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { LoginResult } from "../models/login-result";
import { AuthService } from "../services/auth.service";
import { ToastService } from "../services/toast.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private translate: TranslateService,
  ){}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.authService.getToken();

    if (!!token && !this.isRefreshing) {
      req = this.handleToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
          return this.handleRefreshToken(req, next);
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

      return this.authService.refreshToken({
        token: this.authService.getToken() || '',
        refreshToken: this.authService.getRefreshToken() || ''
      }).pipe(
        switchMap((data: LoginResult) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(data.token);
          return next.handle(this.handleToken(request, data.token));
        }),
        catchError(e => {
          this.isRefreshing = false;
          this.authService.clearStorage();
          this.router.navigate(['login']).then(() => this.toastService.show(this.translate.instant('login.sessionExpired')));
          return throwError(() => e);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => next.handle(this.handleToken(request, jwt)))
      );
    }
  }
}
