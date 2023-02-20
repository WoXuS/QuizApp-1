import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { LoaderService } from "src/app/services/loader.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public isViewLoaded: boolean = false;
  public isUserAdmin: boolean = false;

  public get userLogin(): string {
    if (!this.userService.currentUserName) {
      const userId: string = this.userService.getUserId(this.authService.getToken()!);
      this.userService.getUserName(userId).pipe(take(1)).subscribe({
        next: (name: string) => this.userService.currentUserName = name
      });
    }
    return this.userService.currentUserName;
  }

  constructor(
    public loader: LoaderService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.authService.logOutObs.subscribe({
      next: () => {
        this.userService.currentUserName = '';
        this.isUserAdmin = false;
      }
    });
    this.userService.isUserAdmin().pipe(take(1)).subscribe({
      next: (response) => this.isUserAdmin = response
    });
  }

  public logOut(): void {
    this.authService.signOut();
  }

  public setActiveComponent(event: Component): void {
    this.isViewLoaded = !!event;
}

}
