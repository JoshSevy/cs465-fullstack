import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class TripData {
  private http: HttpClient = inject(HttpClient);

  getTrips(): Observable<Trip[]> {
    let url = 'http://localhost:3000/api/trips';
    return this.http.get<Trip[]>(url);
  }
}
