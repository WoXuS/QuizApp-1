import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, take, tap } from "rxjs";
import { LoginResult } from "../models/login-result";
import { ApiService } from "./api.service";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private readonly ACCESS_TOKEN_NAME = "accessToken";
  private readonly REFRESH_TOKEN_NAME = "refreshToken";

  public get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  constructor(
    private translate: TranslateService,
    private toast: ToastService,
    private router: Router,
    http: HttpClient,
  ) {
    super(http);
  }

  public login(userName: string, password: string): Observable<LoginResult> {
    this.clearStorage();
    return this.http.post<LoginResult>(this.apiUrl + `account/authenticate?username=${userName}&password=${password}`, null)
      .pipe(tap(data => this.setAccessData(data)));
  }

  public refreshToken(tokens: LoginResult): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'account/refresh', { token: tokens.token, refreshToken: tokens.refreshToken })
      .pipe(tap(data => this.setAccessData(data)));
  }

  public getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_NAME);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_NAME);
  }

  private setAccessData(data: LoginResult): void {
    localStorage.setItem(this.ACCESS_TOKEN_NAME, data.token);
    localStorage.setItem(this.REFRESH_TOKEN_NAME, data.refreshToken);
  }

  public clearStorage(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_NAME);
    localStorage.removeItem(this.REFRESH_TOKEN_NAME);
  }

  public signOut(): void {
    const token: string | null = this.getRefreshToken();
    if (!token) {
      this.afterSignOutActions();
      return;
    }
    this.http.patch(this.apiUrl + `account/invalidate?refreshToken=${token}`, null).pipe(take(1)).subscribe({
      next: () => this.afterSignOutActions(),
      error: (e) => {
        console.error('ERROR ON LOGOUT', e);
        this.afterSignOutActions();
      }
    });
  }

  private afterSignOutActions(): void {
    this.clearStorage();
    this.router.navigate(['login']).then(() => this.toast.show(this.translate.instant('login.loggedOut')));
  }
}
