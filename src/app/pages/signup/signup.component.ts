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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpFormGroup: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signUpFormGroup = new FormGroup({
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
    });
  }

  onSubmit() {
    if (this.signUpFormGroup.valid) {
      this.authService
        .postSignUp(this.signUpFormGroup.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/login']);
        });
    }
  }

  get email() {
    return this.signUpFormGroup.get('email');
  }

  get name() {
    return this.signUpFormGroup.get('name');
  }

  get password() {
    return this.signUpFormGroup.get('password');
  }

  get confirmPassword() {
    return this.signUpFormGroup.get('confirmPassword');
  }
}
