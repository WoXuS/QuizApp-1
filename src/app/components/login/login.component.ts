import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
      this.form = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  public login(): void {
    this.authService.login(this.form.get('login')?.value, this.form.get('password')?.value).pipe(take(1)).subscribe({
      next: () => {
        this.toastService.show(this.translate.instant('login.loginSuccess'));
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.error(e);
        this.toastService.show(this.translate.instant('login.loginError'));
      }
    });
  }

  public goToRegister(): void {
    this.router.navigate(['register']);
  }
}
