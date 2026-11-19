import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';


@Injectable({
  providedIn: 'root'
})

export class TripData {
  private url: string = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {
  }

  /**
   * Add a new trip to the database.
   * @param {Trip} formData
   * @returns {Observable<Trip>}
   */
  public addTrip(formData: Trip): Observable<Trip> {
    // console.log("Inside TripDataService::addTrip");
    return this.http.post<Trip>(this.url, formData);
  }

  /**
   * Retrieve a specific trip from the database.
   * @param {string} tripCode
   * @returns {Observable<Trip>}
   */
  public getTrip(tripCode: string): Observable<Trip> {
    // console.log("Inside TripDataService::getTrip");
    return this.http.get<Trip>(this.url + '/' + tripCode);
  }

  /**
   * Retrieve all trips from the database.
   * @returns {Observable<Trip[]>}
   */
  public getTrips(): Observable<Trip[]> {
    // console.log("Inside TripDataService::getTrips");
    return this.http.get<Trip[]>(this.url);
  }

  /**
   * Update an existing trip in the database.
   * @param {Trip} formData
   * @returns {Observable<Trip>}
   */
  public updateTrip(formData: Trip): Observable<Trip> {
    // console.log("Inside TripDataService::updateTrip");
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}
