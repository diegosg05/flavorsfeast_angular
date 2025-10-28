import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models';

@Component({
  selector: 'app-store',
  imports: [RouterLink],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  public productService = inject(ProductService);
  products = toSignal(this.productService.getAllProducts());
  cartCount = toSignal(this.productService.cartCount$);

  addProductToCart(product: Product) {
    this.productService.saveProductInLocal(product);
  }

}

