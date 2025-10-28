import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Product, ProductCart, ApiResponse, MethodPurchase } from '../models';
import { API_BACKEND } from '../constants/Constants';
import { ProductAdapter } from '../adapters';
import currency from 'currency.js';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);


  private initialCartItems = JSON.parse(localStorage.getItem('productsCart') || '[]');
  private cartItems$ = new BehaviorSubject<ProductCart[]>(this.initialCartItems);


  private methodPurchase$ = new BehaviorSubject<MethodPurchase>('dlv');


  cartCount$ = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0))
  );


  private infoCart$ = combineLatest([this.cartItems$, this.methodPurchase$]).pipe(
    map(([items, method]) => {
      const total = this.getTotal(items);
      const igv = this.getIgv(total);
      const subtotal = this.getSubtotal(total, igv, method);
      return { total, igv, subtotal, method };
    })
  );

  getAllProducts() {
    return this.http
      .get<ApiResponse<Product[]>>(`${API_BACKEND}/products`)
      .pipe(map((apiResponse) => ProductAdapter(apiResponse.data)));
  }


  private getTotal(items: ProductCart[]): number {
    return items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  private getIgv(total: number): number {
    return currency(total).multiply(0.18).value;
  }

  private getSubtotal(total: number, igv: number, method: MethodPurchase): number {
    // Solo agregar 12 si es delivery
    const deliveryFee = method === 'dlv' ? 12.0 : 0.0;
    return currency(total).add(igv).add(deliveryFee).value;
  }


  saveProductInLocal(product: Product) {
    const currentItems = this.cartItems$.getValue();
    const existing = currentItems.find((i) => i.uid === product.uid);
    const updated = existing
      ? currentItems.map((i) =>
          i.uid === product.uid ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...currentItems, { ...product, quantity: 1 }];
    localStorage.setItem('productsCart', JSON.stringify(updated));
    this.cartItems$.next(updated);
  }

  reduceQuantityProductInLocal(uid: string) {
    const current = this.cartItems$.getValue();
    const updated = current.map((item) =>
      item.uid === uid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem('productsCart', JSON.stringify(updated));
    this.cartItems$.next(updated);
  }

  addQuantityProductInLocal(uid: string) {
    const current = this.cartItems$.getValue();
    const updated = current.map((item) =>
      item.uid === uid ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem('productsCart', JSON.stringify(updated));
    this.cartItems$.next(updated);
  }

  removeProductInLocal(uid: string) {
    const current = this.cartItems$.getValue();
    const updated = current.filter((i) => i.uid !== uid);
    localStorage.setItem('productsCart', JSON.stringify(updated));
    this.cartItems$.next(updated);
  }


  set methodPurchase(method: MethodPurchase) {
    this.methodPurchase$.next(method);
  }

  get getMethodPurchase() {
    return this.methodPurchase$.asObservable();
  }

  get cartItemsSubject(): Observable<ProductCart[]> {
    return this.cartItems$.asObservable();
  }

  get infoCartSubject(): Observable<{
    total: number;
    igv: number;
    subtotal: number;
    method: MethodPurchase;
  }> {
    return this.infoCart$;
  }
}
