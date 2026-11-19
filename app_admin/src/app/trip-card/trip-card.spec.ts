import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripCard } from './trip-card';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;
  let router: { navigate: ReturnType<typeof vi.fn> };
  const trip: Trip = {
    _id: '1',
    code: 'CLRR210621',
    name: "Claire's Reef",
    length: '4 nights / 5 days',
    start: '2021-06-21T08:00:00Z',
    resort: 'Coral Sands, 5 stars',
    perPerson: '1999.00',
    image: 'reef3.jpg',
    description: "Explore the coral gardens at Claire's Reef."
  };

  beforeEach(async () => {
    router = { navigate: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [TripCard],
      providers: [{ provide: Router, useValue: router }]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trip', trip);
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trip details', () => {
    expect(fixture.nativeElement.textContent).toContain("Claire's Reef");
    expect(fixture.nativeElement.textContent).toContain('Coral Sands, 5 stars');
    expect(fixture.nativeElement.textContent).toContain('4 nights / 5 days');
    expect(fixture.nativeElement.querySelector('img').getAttribute('src'))
      .toBe('assets/images/reef3.jpg');
  });

  it('should store the trip code and navigate to edit-trip', () => {
    component.editTrip(trip);

    expect(localStorage.getItem('tripCode')).toBe('CLRR210621');
    expect(router.navigate).toHaveBeenCalledWith(['edit-trip']);
  });
});
