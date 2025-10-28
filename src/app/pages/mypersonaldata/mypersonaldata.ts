import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthUpdate } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mypersonaldata',
  imports: [ReactiveFormsModule],
  templateUrl: './mypersonaldata.html',
  styleUrl: './mypersonaldata.css',
})
export class Mypersonaldata {
  public authService = inject(AuthService);
  public toast = inject(ToastrService);
  user$ = toSignal(this.authService.authSubject);
  updateDataForm: FormGroup;

  constructor() {
    const user = this.user$();

    this.updateDataForm = new FormGroup({
      firstname: new FormControl(user?.firstname, [Validators.required]),
      lastname: new FormControl(user?.lastname, [Validators.required]),
      phone: new FormControl(user?.phone, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[0-9]{9}$/),
      ]),
    });
  }

  handleSubmit() {
    if (this.updateDataForm.valid) {
      Swal.fire({
        title: 'Actualizar datos',
        text: '¿Está seguro con actualizar sus datos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Actualizar',
      }).then((result) => {
        if (result.isConfirmed) {
          const updateUser: AuthUpdate = this.updateDataForm.value;
          this.authService.updateUser(updateUser).subscribe({
            next: (data) => {
              this.authService.editAuth = data.data;
              this.toast.success("Se ha actualizado sus datos con éxito");
            },
            error: () => {
              this.toast.error("Hubo un error en la operación");
            }
          });
        }
      });
    } else {
      this.updateDataForm.markAllAsTouched();
    }
  }
}
