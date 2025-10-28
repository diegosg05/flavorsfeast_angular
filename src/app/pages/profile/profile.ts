import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  public authService = inject(AuthService);
  user$ = toSignal(this.authService.authSubject);
}
