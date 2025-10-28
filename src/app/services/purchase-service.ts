import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse, PurchaseRequest, PurchaseResponse } from '../models';
import { API_BACKEND } from '../constants/Constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private http = inject(HttpClient);
  private purchase$ = new BehaviorSubject<PurchaseRequest | null>(null);

  savePurchase(purchase: PurchaseRequest) {
    return this.http.post<ApiResponse<PurchaseResponse>>(`${API_BACKEND}/purchases`, purchase, { withCredentials: true });
  }

  getAllPurchases() {
    return this.http.get<ApiResponse<PurchaseResponse[]>>(`${API_BACKEND}/purchases`, { withCredentials: true });
  }

  get purchaseSubject() {
    return this.purchase$.asObservable();
  }

  set editPurchaseSubject(purchase: PurchaseRequest) {
    this.purchase$.next(purchase);
  }
}
