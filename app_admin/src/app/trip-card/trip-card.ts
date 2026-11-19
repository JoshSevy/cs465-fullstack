import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  imports: [
    CurrencyPipe,
    NgIf
  ],
  standalone: true,
  selector: 'app-trip-card',
  styleUrl: './trip-card.css',
  templateUrl: './trip-card.html',
})
export class TripCard {
  @Input('trip') trip!: Trip;

  constructor(
    private authenticationService: Authentication,
    private router: Router
  ) { }

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    void this.router.navigate(['edit-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
