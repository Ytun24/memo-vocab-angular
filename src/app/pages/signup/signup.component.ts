import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
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
  signUpFormGroup = new FormGroup({
    email: new FormControl(),
    name: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService
      .postSignUp(this.signUpFormGroup.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/login']);
      });
  }
}
