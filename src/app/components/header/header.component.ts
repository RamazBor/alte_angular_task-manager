import { NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthFacade } from '../../facades';

@Component({
  selector: 'alte-header',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() signUp!: string;
  @Input() signIn!: string;
  @Input() tasks!: string;
  @Input() projects!: string;
  @Input() signOut!: string;

  authFacade: AuthFacade = inject(AuthFacade);

  get isAuthenticated() {
    return this.authFacade.isAuthenticated;
  }

  logout(): void {
    this.authFacade.logout();
  }
}
