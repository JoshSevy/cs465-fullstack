import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Trip } from '../models/trip';
import { TripData } from './trip-data';

describe('TripData', () => {
  let service: TripData;
  let httpTesting: HttpTestingController;
  const galeReef: Trip = {
    _id: '1',
    code: 'GALR210214',
    name: 'Gale Reef',
    length: '4 nights / 5 days',
    start: '2021-02-14T08:00:00Z',
    resort: 'Emerald Bay, 3 stars',
    perPerson: '799.00',
    image: 'reef1.jpg',
    description: 'Explore the coral gardens at Gale Reef.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TripData);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all scuba trips', () => {
    let response: Trip[] | undefined;
    service.getTrips().subscribe(value => response = value);

    const request = httpTesting.expectOne('http://localhost:3000/api/trips');
    expect(request.request.method).toBe('GET');
    request.flush([galeReef]);

    expect(response).toEqual([galeReef]);
  });

  it('should retrieve a scuba trip by code', () => {
    let response: Trip | undefined;
    service.getTrip(galeReef.code).subscribe(value => response = value);

    const request = httpTesting.expectOne(
      'http://localhost:3000/api/trips/GALR210214'
    );
    expect(request.request.method).toBe('GET');
    request.flush(galeReef);

    expect(response).toEqual(galeReef);
  });

  it('should add a scuba trip', () => {
    let response: Trip | undefined;
    service.addTrip(galeReef).subscribe(value => response = value);

    const request = httpTesting.expectOne('http://localhost:3000/api/trips');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(galeReef);
    request.flush(galeReef);

    expect(response).toEqual(galeReef);
  });

  it('should update a scuba trip by code', () => {
    let response: Trip | undefined;
    service.updateTrip(galeReef).subscribe(value => response = value);

    const request = httpTesting.expectOne(
      'http://localhost:3000/api/trips/GALR210214'
    );
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(galeReef);
    request.flush(galeReef);

    expect(response).toEqual(galeReef);
  });
});
