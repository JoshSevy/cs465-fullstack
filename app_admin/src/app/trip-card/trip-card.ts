import { Component, input } from '@angular/core';
import { Trip } from '../models/trips';
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
  trip = input<Trip>();
}
