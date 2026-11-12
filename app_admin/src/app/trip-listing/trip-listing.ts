import { JsonPipe, NgForOf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  imports: [
    NgForOf,
    TripCard,
    JsonPipe
  ],
  providers: [TripData],
  selector: 'app-trip-listing',
  styleUrl: './trip-listing.css',
  templateUrl: './trip-listing.html'
})
export class TripListing implements OnInit {
  trips: Array<Trip> = [];

  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    console.log("trip-listing constructor");
  }

  public ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public addTrip(): void {
    void this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;
          // For the app-trip-cards to render without moving to signals I needed to trigger change detection to follow
          // the guide books example in a zone-less angular application. I plan to convert to Ng22 with the capstone so
          // following the guide exactly.
          this.changeDetectorRef.markForCheck();

          if (value.length > 0) {
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
