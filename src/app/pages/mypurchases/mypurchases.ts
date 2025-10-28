import { Component, inject } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-mypurchases',
  imports: [],
  templateUrl: './mypurchases.html',
  styleUrl: './mypurchases.css',
})
export class Mypurchases {
  public purchaseService = inject(PurchaseService);
  purchases$ = toSignal(this.purchaseService.getAllPurchases());
}
