import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { Profile } from "src/app/models/profile";
import { SaveProfileDto } from "src/app/models/save-profile-dto";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-component',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public profile!: Profile;
  public form!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private translate: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.profile = this.route.snapshot.data['profile'];

    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.form.patchValue(this.profile);
  }

  public saveProfileData(): void {
    this.isLoading = true;
    const userData: SaveProfileDto = this.form.value;
    this.userService.saveUserData(userData).pipe(take(1)).subscribe({
      next: () => {
        this.toast.show(this.translate.instant('profile.updateSuccess'));
        this.form.reset();
        this.form.markAsUntouched();
        this.userService.getProfile().pipe(take(1)).subscribe({
          next: (profile) => {
            this.profile = profile;
            this.form.patchValue(this.profile);
            this.isLoading = false;
          },
          error: (e) => {
            console.error(e);
            this.isLoading = false;
          }
        });
      },
      error: (e) => {
        console.error(e);
        this.toast.show(this.translate.instant('profile.updateError'));
        this.isLoading = false;
      }
    });
  }
}
