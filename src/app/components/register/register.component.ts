import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { SaveProfileDto } from "src/app/models/save-profile-dto";
import { AuthService } from "src/app/services/auth.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public register(): void {
    const profile: SaveProfileDto = this.form.value;
    this.authService.register(profile).pipe(take(1)).subscribe({
      next: (data) => {
        this.toastService.show(this.translate.instant('register.registerSuccess'));
        this.router.navigate(['login']).then(() => alert("Adres email nie jest potwierdzony. W celu testu można go potwierdzić używając Swaggera lub klikając przycisk na ekranie logowania (dopóki strona nie zostanie przeładowana). Kod potwierdzenia dostępny jest w konsoli developerskiej."));
        console.info('EMAIL CODE: ', data.emailConfirmationtoken);
      },
      error: (e) => {
        console.error(e);
        this.toastService.show(this.translate.instant('register.registerError'));
      }
    });
  }

  public goToLogin(): void {
    this.router.navigate(['login']);
  }

  public validatePassword(): void {
    const password: string = this.form.get('password')?.value;
    if (password.length < 6) {
      this.form.get('password')?.setErrors({ error: true });
    }
  }

  public validateConfirmPassword(): void {
    const password: string = this.form.get('password')?.value;
    const confirmPassword: string = this.form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.form.get('confirmPassword')?.setErrors({ error: true });
    }
  }
}
