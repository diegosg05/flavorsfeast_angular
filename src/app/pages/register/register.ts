import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services';
import { AuthRegister } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9}$/), Validators.maxLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  public router = inject(Router);
  public authService = inject(AuthService);
  public toast = inject(ToastrService);

  handleSubmit(){
    
  if(this.registerForm.valid){
    const authValue: AuthRegister = this.registerForm.value;
      this.authService.register(authValue).subscribe({
        next: (res) => {
            this.authService.editAuth = res.data;
            this.router.navigate(['/']);
            this.toast.success("Cuenta registrada exitosamente!");
        },
        error: () => {
          this.toast.error("El email ingresado ya está en uso");
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  handlePhoneInput() {
    const inputPhone = this.registerForm.get('phone');

    if(!inputPhone) return;

    let value = inputPhone.value?.replace(/\D/g, '') || '';

    if (value.length > 9)
      value = value.slice(0, 9);

    inputPhone.setValue(value, { emitEvent: false });
  }

  handleFirstnameInput() {
    this.handleNameInputs("firstname");
  }

  handleLastnameInput(){
    this.handleNameInputs("lastname");
  }

  handleNameInputs(name: string) {
    const fullNameInput = this.registerForm.get(name);

    if(!fullNameInput) return;

    let value = fullNameInput.value?.replace(/[^A-Za-zñÑ ]/g, '') || '';

    fullNameInput.setValue(value);
  }
}

