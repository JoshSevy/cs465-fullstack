import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AddTrip } from './add-trip';
import { TripData } from '../services/trip-data';

describe('AddTrip', () => {
  let component: AddTrip;
  let fixture: ComponentFixture<AddTrip>;
  let tripService: {
    addTrip: ReturnType<typeof vi.fn>;
  };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    tripService = {
      addTrip: vi.fn().mockReturnValue(of({}))
    };
    router = { navigate: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [ AddTrip ],
      providers: [
        { provide: TripData, useValue: tripService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTrip);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize all required form controls', () => {
    expect(component.addForm).toBeTruthy();
    expect(Object.keys(component.addForm.controls)).toEqual([
      '_id', 'code', 'name', 'length', 'start', 'resort', 'perPerson',
      'image', 'description'
    ]);
    expect(component.addForm.valid).toBe(false);
  });

  it('should mark an empty submission as submitted without saving', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(tripService.addTrip).not.toHaveBeenCalled();
  });

  it('should save a valid trip and navigate home', async () => {
    const formValue = {
      code: 'GALR210214',
      name: 'Gale Reef',
      length: '4 nights / 5 days',
      start: '2021-02-14T08:00:00Z',
      resort: 'Emerald Bay, 3 stars',
      perPerson: '799.00',
      image: 'reef1.jpg',
      description: 'Explore the coral gardens at Gale Reef.'
    };
    component.addForm.patchValue(formValue);

    component.onSubmit();
    await fixture.whenStable();

    expect(tripService.addTrip).toHaveBeenCalledWith({
      ...formValue,
      _id: null
    });
    expect(router.navigate).toHaveBeenCalledWith([ '' ]);
  });
});
