import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse, AuthLogin, AuthRegister, AuthResetPass, AuthResponse, AuthUpdate } from '../models';
import { API_BACKEND } from '../constants/Constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private initialAuth = JSON.parse(localStorage.getItem('UATHDAT') || 'null');
  private auth$ = new BehaviorSubject<AuthResponse | null>(this.initialAuth);

  login(authLogin: AuthLogin) {
    return this.http.post<ApiResponse<AuthResponse>>(`${API_BACKEND}/auth/login`, authLogin, { withCredentials: true});
  }

  register(authRegister: AuthRegister) {
    return this.http.post<ApiResponse<AuthResponse>>(`${API_BACKEND}/auth/register`, authRegister, { withCredentials: true});
  }

  logout() {
    return this.http.post<ApiResponse<string>>(`${API_BACKEND}/auth/logout`, '', { withCredentials: true});
  }

  updateUser(auth: AuthUpdate) {
    return this.http.put<ApiResponse<AuthResponse>>(`${API_BACKEND}/users`, auth, { withCredentials: true });
  }

  updatePassword(auth: AuthResetPass) {
    return this.http.put<ApiResponse<void>>(`${API_BACKEND}/users/reset-password`, auth, { withCredentials: true });
  }

  set editAuth(auth: AuthResponse | null) {
    this.auth$.next(auth);
    localStorage.setItem('UATHDAT', JSON.stringify(auth));
  }

  removeAuth() {
    this.auth$.next(null);
    localStorage.removeItem('UATHDAT');
  }

  get authSubject() {
    return this.auth$.asObservable();
  }
}
