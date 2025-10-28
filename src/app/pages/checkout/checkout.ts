import { Payment } from './../../models/Payment';
import { toSignal } from '@angular/core/rxjs-interop';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase-service';
import flatpickr from 'flatpickr';
import currency from 'currency.js';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  @ViewChild('expiration') cardExpirationInput!: ElementRef<HTMLInputElement>;

  public router = inject(Router);
  public purchaseService = inject(PurchaseService);
  public reservationService = inject(ReservationService);
  public toast = inject(ToastrService);
  purchase$ = toSignal(this.purchaseService.purchaseSubject)
  reservation$ = toSignal(this.reservationService.getReservationSubject);
  bills: Payment = { subtotal: 0, tax: 0, total: 0 };
  currentNav!: Navigation | null;
  fromNav: string;

  constructor() {
    this.currentNav = this.router.currentNavigation();
    this.fromNav = this.currentNav?.extras.state?.['from'];

    if (this.fromNav === 'cart') {
      const purchase = this.purchase$();
      if (purchase) {
        this.bills.subtotal = purchase.subtotal ?? 0;
        this.calculateBills(this.bills.subtotal);
      } else {
        this.toast.warning("No hay datos de compra disponibles");
        this.router.navigate(['/micarrito']);
      }
    } else if (this.fromNav === 'reserve') {
      const reserve = this.reservation$();
      if (reserve) {
        this.bills.subtotal = 300.00;
        this.calculateBills(this.bills.subtotal);
      } else {
        this.toast.warning("No hay datos de reserva disponibles");
        this.router.navigate(['/reserve']);
      }
    }
  }

  paymentForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    card: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6), Validators.pattern(/^[0-9]{16}$/)]),
    expiration: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(/^[0-9]{3}$/)]),
  });

  ngAfterViewInit() {
    const expInput = this.cardExpirationInput.nativeElement;
    const today = new Date();
    const expirationValue = today.getMonth() + 1 + '-' + today.getFullYear();

    flatpickr(expInput, {
      dateFormat: 'm-Y',
      minDate: expirationValue,
    });
  }

  handleCvvInput() {
    const cvvInput = this.paymentForm.get('cvv');

    if (!cvvInput) return;

    let value = cvvInput.value?.replace(/\D/g, '') || '';

    if (value.length > 3) value = value.slice(0, 3);

    cvvInput.setValue(value);
  }

  handleCardInput() {
    const cardInput = this.paymentForm.get('card');

    if (!cardInput) return;

    let value = cardInput.value?.replace(/\D/g, '') || '';

    if (value.length > 16) value = value.slice(0, 16);

    cardInput.setValue(value);
  }

  calculateBills(subtotal: number) {
    this.bills.tax = currency(subtotal).multiply(0.05).value;
    this.bills.total = currency(subtotal).add(this.bills.tax).value;
  }

  handleSubmit() {
    if (this.paymentForm.valid) {
      Swal.fire({
      title: "¿Realizar Pago?",
      text: "¿Seguro que quiere realizar el pago?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Pagar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.fromNav === 'cart') {
          this.savePurchase();
        } else if (this.fromNav === 'reserve') {
          this.saveReservation();
        }
      }
    });
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  savePurchase() {
    const purchase = this.purchase$();
    if (purchase!!) {
      this.purchaseService.savePurchase(purchase).subscribe({
        next: () => {
          this.toast.success("Compra realizada exitosamente");
          this.router.navigate(['/']);
        },
        error: () => {
          this.toast.error("No se pudo realizar la operación");
        }
      });
    }
  }

  saveReservation() {
    const reserve = this.reservation$();
    if (reserve!!) {
      this.reservationService.saveReservation(reserve).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toast.success("Reserva realizada exitosamente!");
        },
        error: () => {
          this.toast.error("No se pudo realizar la operación");
        }
      });
    }
  }
}
