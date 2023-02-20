import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(observer => {
      this.userService.isUserAdmin().pipe(take(1)).subscribe({
        next: (response) => {
          const isAuthenticated: boolean = this.authService.isAuthenticated && response;
          if (!isAuthenticated) {
            this.router.navigate(['./']);
          }
          observer.next(isAuthenticated);
        },
        error: (e) => {
          console.error(e);
          observer.next(false);
        }
      });
    });
  }
}
