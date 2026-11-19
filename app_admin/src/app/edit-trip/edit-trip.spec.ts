import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { EditTrip } from './edit-trip';

describe('EditTrip', () => {
  let component: EditTrip;
  let fixture: ComponentFixture<EditTrip>;
  let tripData: {
    getTrip: ReturnType<typeof vi.fn>;
    updateTrip: ReturnType<typeof vi.fn>;
  };
  let router: { navigate: ReturnType<typeof vi.fn> };
  const trip: Trip = {
    _id: '1',
    code: 'DAWR210315',
    name: "Dawson's Reef",
    length: '4 nights / 5 days',
    start: '2021-03-15T08:00:00Z',
    resort: 'Blue Lagoon, 4 stars',
    perPerson: '1199.00',
    image: 'reef2.jpg',
    description: "Discover the vibrant marine life at Dawson's Reef."
  };

  beforeEach(async () => {
    localStorage.clear();
    tripData = {
      getTrip: vi.fn().mockReturnValue(of(trip)),
      updateTrip: vi.fn().mockReturnValue(of(trip))
    };
    router = { navigate: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [EditTrip],
      providers: [
        { provide: TripData, useValue: tripData },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTrip);
    component = fixture.componentInstance;
    localStorage.setItem('tripCode', trip.code);
    component.ngOnInit();
    await fixture.whenStable();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the trip and populate the form', () => {
    expect(tripData.getTrip).toHaveBeenCalledWith('DAWR210315');
    expect(component.editForm.getRawValue()).toMatchObject({
      code: 'DAWR210315',
      name: "Dawson's Reef",
      start: '2021-03-15',
      resort: 'Blue Lagoon, 4 stars'
    });
    expect(component.message).toBe('Trip: DAWR210315 retrieved');
  });

  it('should format dates for date inputs', () => {
    expect(component.formattedDate('2021-03-15')).toBe('2021-03-15');
    expect(component.formattedDate('')).toBe('');
  });

  it('should update a valid trip and navigate home', async () => {
    component.onSubmit();
    await fixture.whenStable();

    expect(tripData.updateTrip).toHaveBeenCalledWith(component.editForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
