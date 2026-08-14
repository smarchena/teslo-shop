import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  private fb = inject(FormBuilder)
   hasError = signal(false)
  isPosting = signal(false)
  router = inject(Router)

  authService = inject(AuthService)

  registerForm = this.fb.group({
    fullName: ['', Validators.required, Validators.minLength(4)],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return
    }

    const { fullName = '', email = '', password = '' } = this.registerForm.value

    this.authService.register(fullName!, email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/')
        return
      }
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
    })
  }
}
