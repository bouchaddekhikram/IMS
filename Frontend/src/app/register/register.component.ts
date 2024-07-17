import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service'; // Import ToastService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: '',
    email: '',
    password: '',
    role: ''
  };
  errorMessage: string = '';
  roles: string[] = ['ST', 'RH'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService // Inject ToastService
  ) { }

  onSubmit(): void {
    if (!this.form.username || !this.form.email || !this.form.password || !this.form.role) {
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    if (this.form.password.length < 6 || this.form.password.length > 40) {
      this.errorMessage = 'Password must be between 6 and 40 characters';
      return;
    }

    const user = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      role: [this.form.role]
    };

    this.authService.register(user).subscribe(
      (response) => {
        this.toastService.show('User registered successfully!'); // Show success message
        this.router.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message || 'An error occurred during registration';
        console.log(err);
      }
    );
  }
}
