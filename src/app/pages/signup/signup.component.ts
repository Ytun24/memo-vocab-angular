import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationComponent } from '../../components/notification/notification.component';
import { matcherValidator } from '../../validators/matcherValidator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupFormGroup: any;
  displayNoti = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signupFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    }, matcherValidator('password', 'confirmPassword'));
  }

  onSubmit() {
    if (this.signupFormGroup.valid) {
      this.authService.postSignUp(this.signupFormGroup.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this.displayNoti = true;
        },
      });
    }
  }

  get email() {
    return this.signupFormGroup.get('email');
  }

  get name() {
    return this.signupFormGroup.get('name');
  }

  get password() {
    return this.signupFormGroup.get('password');
  }

  get confirmPassword() {
    return this.signupFormGroup.get('confirmPassword');
  }
}
