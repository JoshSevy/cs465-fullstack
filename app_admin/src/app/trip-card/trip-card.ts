import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [
    CurrencyPipe
  ],
  selector: 'app-trip-card',
  styleUrl: './trip-card.css',
  templateUrl: './trip-card.html',
})
export class TripCard {
  @Input('trip') trip!: Trip;
}
