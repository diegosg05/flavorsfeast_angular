import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLogin } from '../../models';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public authService = inject(AuthService);
  public router = inject(Router);
  public toast = inject(ToastrService);

  handleSubmit() {
    
    if (this.loginForm.valid) {
      const loginValue: AuthLogin = this.loginForm.value;
      this.authService.login(loginValue).subscribe({
        next: (res) => {
          this.authService.editAuth = res.data;
          this.router.navigate(['/']);
          this.toast.success("Inicio de sesión exitoso!");
        },
        error: () => {
          this.toast.error("El correo y/o la contraseña es incorrecta");
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}

