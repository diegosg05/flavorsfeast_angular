import { Component, inject } from '@angular/core';
import { ReservationService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-myreservations',
  imports: [],
  templateUrl: './myreservations.html',
  styleUrl: './myreservations.css',
})
export class Myreservations {
  public reservationService = inject(ReservationService);
  reservation$ = toSignal(this.reservationService.getAllReservations());
}
