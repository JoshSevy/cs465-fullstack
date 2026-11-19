import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripListing } from './trip-listing';

describe('TripListing', () => {
  let component: TripListing;
  let fixture: ComponentFixture<TripListing>;
  let tripData: { getTrips: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  const trips: Trip[] = [
    {
      _id: '1',
      code: 'GALR210214',
      name: 'Gale Reef',
      length: '4 nights / 5 days',
      start: '2021-02-14T08:00:00Z',
      resort: 'Emerald Bay, 3 stars',
      perPerson: '799.00',
      image: 'reef1.jpg',
      description: 'Explore the coral gardens at Gale Reef.'
    },
    {
      _id: '2',
      code: 'DAWR210315',
      name: "Dawson's Reef",
      length: '4 nights / 5 days',
      start: '2021-03-15T08:00:00Z',
      resort: 'Blue Lagoon, 4 stars',
      perPerson: '1199.00',
      image: 'reef2.jpg',
      description: 'Discover the vibrant marine life at Dawson\'s Reef.'
    }
  ];

  beforeEach(async () => {
    tripData = {
      getTrips: vi.fn().mockReturnValue(of(trips))
    };
    router = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [TripListing],
    })
      .overrideComponent(TripListing, {
        set: {
          providers: [
            { provide: TripData, useValue: tripData },
            { provide: Router, useValue: router }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(TripListing);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load trips on initialization and render a card for each trip', () => {
    expect(tripData.getTrips).toHaveBeenCalledTimes(1);
    expect(component.trips).toEqual(trips);
    expect(component.message).toBe('There are 2 trips available.');
    expect(fixture.nativeElement.querySelectorAll('app-trip-card')).toHaveLength(2);
  });

  it('should report when no trips are returned', async () => {
    tripData.getTrips.mockReturnValueOnce(of([]));

    component.ngOnInit();
    await fixture.whenStable();

    expect(component.trips).toEqual([]);
    expect(component.message).toBe('There are no trips retrieved from the database.');
  });

  it('should log an error when trips cannot be loaded', async () => {
    const error = new Error('Request failed');
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    tripData.getTrips.mockReturnValueOnce(throwError(() => error));

    component.ngOnInit();
    await fixture.whenStable();

    expect(consoleSpy).toHaveBeenCalledWith('Error: ' + error);
    consoleSpy.mockRestore();
  });

  it('should navigate to add-trip when addTrip is called', () => {
    component.addTrip();

    expect(router.navigate).toHaveBeenCalledWith(['add-trip']);
  });
});
