import { ReservationAdapter } from './../../adapters';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ReservationService } from '../../services';
import { Reservation } from '../../models';
import flatpickr from 'flatpickr';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})
export class Reserve {
  @ViewChild('dateReservationInput')
  dateReservation!: ElementRef<HTMLInputElement>;
  @ViewChild('timeReservationInput')
  timeReservation!: ElementRef<HTMLInputElement>;

  persons: number = 1;

  reserveForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    persons: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(6), Validators.maxLength(1), Validators.pattern(/^[1-6]{1}$/)]),
    location: new FormControl('', [Validators.required])
  });

  public reservationService = inject(ReservationService);
  public toast = inject(ToastrService);
  public router = inject(Router);

  ngAfterViewInit() {
    const today = new Date();
    const tomorrow = today.getDate() + 1;
    const minDate: string = tomorrow + '-' + (today.getMonth() + 1);
    const maxDate: string = tomorrow + '-' + (today.getMonth() + 2);
    const element = this.dateReservation.nativeElement;

    flatpickr(element, {
      dateFormat: 'd-m',
      minDate: minDate,
      maxDate: maxDate,
      disableMobile: true,
    });

    const element2 = this.timeReservation.nativeElement;
    flatpickr(element2, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      minTime: '13:30',
      maxTime: '18:30',
      disableMobile: true,
    });
  }

  handleSubmit() {
    if (this.reserveForm.valid) {
      Swal.fire({
        title: "¿Realizar Reserva?",
        text: "Costo de reserva: S/. 300",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: 'Cancelar',
        confirmButtonText: "Reservar"
      }).then((result) => {
        if (result.isConfirmed) {
          const reserve: Reservation = ReservationAdapter(this.reserveForm.value);
          this.reservationService.editRservation = reserve;
          this.router.navigate(['/checkout'], { state: { from: 'reserve' } });
        }
      });
    } else {
      this.reserveForm.markAllAsTouched();
    }
  }

  addPersons() {
    if (this.persons < 6) {
      this.persons = this.persons + 1;
      const personsInput = this.reserveForm.get('persons');

      if (!personsInput) return;

      const value = this.persons;
      personsInput.setValue(value);
    }
  }

  reducePersons() {
    if (this.persons > 1) {
      this.persons = this.persons - 1;

      const personsInput = this.reserveForm.get('persons');

      if (!personsInput) return;

      const value = this.persons;
      personsInput.setValue(value);
    }
  }


}
