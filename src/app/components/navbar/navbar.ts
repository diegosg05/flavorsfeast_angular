import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public authSerice = inject(AuthService);
  public router = inject(Router);
  public toast = inject(ToastrService);
  auth$ = toSignal(this.authSerice.authSubject);

  constructor() {
    // Ejecutar initFlowbite() cada vez que cambie auth$
    effect(() => {
      this.auth$();
      setTimeout(() => initFlowbite(), 100);
    });
  }

  logout() {
    Swal.fire({
      title: "¿Seguro?",
      text: "¿Quiere cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Ok"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authSerice.logout().subscribe({
          next: () => {
            this.authSerice.removeAuth();
            this.router.navigate(['/']);
            this.toast.success("Cierre de sesión exitoso!");
          },
          error: () => {
            this.toast.error("No se pudo realizar la operación");
          } 
        });
      }
    });
  }
}