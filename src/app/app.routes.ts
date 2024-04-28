import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { VocabListComponent } from './pages/vocab-list/vocab-list.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AddVocabComponent } from './pages/add-vocab/add-vocab.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', component: VocabListComponent },
  { path: 'add-vocab', component: AddVocabComponent },
];
