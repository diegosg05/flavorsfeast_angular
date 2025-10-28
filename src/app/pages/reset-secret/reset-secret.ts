import { AuthService } from './../../services/auth-service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthResetPass } from '../../models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-secret',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-secret.html',
  styleUrl: './reset-secret.css',
})
export class ResetSecret {
  @ViewChild('actualpass') actualPasswordElement!: ElementRef<HTMLInputElement>;
  @ViewChild('newpass') newPasswordElement!: ElementRef<HTMLInputElement>;
  @ViewChild('newpassagain') newPasswordAgainElement!: ElementRef<HTMLInputElement>;

  @ViewChild('actview') actViewElement!: ElementRef<HTMLImageElement>;
  @ViewChild('newview') newviewElement!: ElementRef<HTMLImageElement>;
  @ViewChild('againview') againviewElement!: ElementRef<HTMLImageElement>;

  public AuthService = inject(AuthService);
  public toast = inject(ToastrService);
  resetPasswordForm: FormGroup;

  constructor() {
    this.resetPasswordForm = new FormGroup(
      {
        actualPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        againNewPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('newPassword')?.value === control.get('againNewPassword')?.value
      ? null
      : { mismatch: true };
  }

  changeTypeInput(id: string) {
    switch (id) {
      case 'actualpass':
        const actPass = this.actualPasswordElement.nativeElement;
        const actView = this.actViewElement.nativeElement;
        actPass.type = actPass.type === 'password' ? 'text' : 'password';
        actView.src = actPass.type === 'password' ? '/view-icon.png' : '/view-hide-icon.png';
        break;
      case 'newpass':
        const newPass = this.newPasswordElement.nativeElement;
        const newView = this.newviewElement.nativeElement;
        newPass.type = newPass.type === 'password' ? 'text' : 'password';
        newView.src = newPass.type === 'password' ? '/view-icon.png' : '/view-hide-icon.png';
        break;
      case 'newpassagain':
        const newPassAgain = this.newPasswordAgainElement.nativeElement;
        const againview = this.againviewElement.nativeElement;
        newPassAgain.type = newPassAgain.type === 'password' ? 'text' : 'password';
        againview.src = newPassAgain.type === 'password' ? '/view-icon.png' : '/view-hide-icon.png';
        break;
    }
  }

  handleSubmit() {
    if (this.resetPasswordForm.valid) {
      Swal.fire({
        title: 'Actualizar contraseña',
        text: '¿Está seguro con actualizar su contraseña?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Actualizar',
      }).then((result) => {
        if (result.isConfirmed) {
          const { actualPassword, newPassword }: AuthResetPass = this.resetPasswordForm.value;
          this.AuthService.updatePassword({
            actualPassword: actualPassword,
            newPassword: newPassword,
          }).subscribe({
            next: () => {
              this.toast.success('La contraseña ha sido actualizada');
            },
            error: () => {
              this.toast.error('La contraseña actual es incorrecta');
            },
          });
        }
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
