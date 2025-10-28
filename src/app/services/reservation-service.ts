import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reservation, ApiResponse } from '../models';
import { API_BACKEND } from '../constants/Constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient);
  private reservation$ = new BehaviorSubject<Reservation | null>(null);

  saveReservation(resv: Reservation) {
    return this.http.post<ApiResponse<Reservation>>(`${API_BACKEND}/reservations`, resv, { withCredentials: true });
  }

  getAllReservations() {
    return this.http.get<ApiResponse<Reservation[]>>(`${API_BACKEND}/reservations`, {withCredentials: true});
  }

  get getReservationSubject() {
    return this.reservation$.asObservable();
  }

  set editRservation(reserv: Reservation) {
    this.reservation$.next(reserv);
  }
}
