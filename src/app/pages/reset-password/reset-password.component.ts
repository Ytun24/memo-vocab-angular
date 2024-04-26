import { Component } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { matcherValidator } from '../../validators/matcherValidator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: any;
  displayNoti = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.queryParamMap.get('id');
    const resetToken = this.route.snapshot.queryParamMap.get('token');
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        userId: [userId],
        resetToken: [resetToken],
      },
      { validators: matcherValidator('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService
        .postResetPassword(this.resetPasswordForm.value)
        .subscribe({
          next: (data) => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.displayNoti = true;
          },
        });
    }
  }

  get password(): FormControl {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword(): FormControl {
    return this.resetPasswordForm.get('confirmPassword');
  }

  get userId(): FormControl {
    return this.resetPasswordForm.get('userId');
  }

  get resetToken(): FormControl {
    return this.resetPasswordForm.get('resetToken');
  }
}
