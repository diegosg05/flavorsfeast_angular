import { ProductService } from './../../services';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MethodPurchase, ProductCart, PurchaseProducts, PurchaseRequest } from '../../models';
import { PurchaseService } from '../../services/purchase-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  public productService = inject(ProductService);
  productsCart$ = toSignal(this.productService.cartItemsSubject);
  infoCart$ = toSignal(this.productService.infoCartSubject);
  public purchaseService = inject(PurchaseService);
  public toast = inject(ToastrService);
  public router = inject(Router);
  
  address = "";
  location = "";
  messageError = "";

  reduceQuantity(uid: string) {
    this.productService.reduceQuantityProductInLocal(uid);
  }

  addQuantity(uid: string) {
    this.productService.addQuantityProductInLocal(uid);
  }

  removeProduct(uid: string) {
    this.productService.removeProductInLocal(uid);
  }

  handleMethodPurchase(method: MethodPurchase) {
    this.productService.methodPurchase = method;
    this.messageError = "";
  }

  openModalCheckout() {
    const infoCart = this.infoCart$() ?? null;
    const productsCart = this.productsCart$() ?? [];
    if (infoCart!! && productsCart!!) {
      // Valida si el usuario va retirar o por delivery
      if (infoCart.method === "dlv") {
        // Valida si el usuario ha ingresado una dirección
        if (this.address!!) {
          this.handlePurchaseSubmit(infoCart, productsCart);
          this.messageError = '';
          return;
        }
        this.messageError = 'Ingrese una dirección';

      } else {
        // Valida si el usuario ha seleccionado una sede
        if (this.location!!) {
          this.handlePurchaseSubmit(infoCart, productsCart);
          this.messageError = '';
          return;
        }
        this.messageError = 'Selecciona una sede';

      }
    }
  }

  handlePurchaseSubmit(infoCart: { total: number, igv: number, subtotal: number, method: MethodPurchase }, products: ProductCart[]) {
    const productsToBuy: PurchaseProducts[] = products.map((p) => ({ uid: p.uid, quantity: p.quantity}));

    const purchase: PurchaseRequest = {
      type: infoCart.method === 'dlv' ? 'delivery' : 'retiro',
      address: this.address === "" ? null : this.address,
      location: this.location === "" ? null : this.location,
      subtotal: infoCart.subtotal,
      products: productsToBuy
    }

    this.purchaseService.editPurchaseSubject = purchase;
    this.router.navigate(['/checkout'], { state: { from: 'cart' } });
  }
}
