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
      next: () => this.userService.currentUserName = ''
    });
  }

  public logOut(): void {
    this.authService.signOut();
  }
}
