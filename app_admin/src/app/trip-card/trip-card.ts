import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';

@Component({
  imports: [
    CurrencyPipe
  ],
  selector: 'app-trip-card',
  standalone: true,
  styleUrl: './trip-card.css',
  templateUrl: './trip-card.html',
})
export class TripCard {
  @Input('trip') trip!: Trip;

  constructor(private router: Router) {
  }

  /**
   * Stores the trip code in local storage and navigates to the edit-trip page for editing the selected trip.
   * @param {Trip} trip
   */
  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    void this.router.navigate([ 'edit-trip' ]);
  }
}
