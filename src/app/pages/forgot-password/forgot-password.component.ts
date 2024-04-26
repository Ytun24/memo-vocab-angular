import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  emailInput = '';
  displayNoti = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSendEmail(isEmailValid: boolean) {
    if (isEmailValid) {
      this.authService
        .postForgotPassword({ email: this.emailInput })
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
}
