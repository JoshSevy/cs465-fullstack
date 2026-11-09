import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import { Trip } from '../models/trip';
import { CurrencyPipe, JsonPipe, NgForOf } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';

@Component({
  imports: [
    JsonPipe,
    NgForOf,
    TripCard
  ],
  providers: [TripData],
  selector: 'app-trip-listing',
  styleUrl: './trip-listing.css',
  templateUrl: './trip-listing.html',
})
export class TripListing implements OnInit {
  protected readonly trips: Array<Trip> = trips;

  trips!: Trip[] = [];
  message: string = '';

  constructor(private tripData: TripData) {
  }

  public ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;

          if (value.lengt > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There are no trips retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
}
