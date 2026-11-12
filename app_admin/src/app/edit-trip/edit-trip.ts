import { DatePipe, formatDate, NgClass, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  selector: 'app-edit-trip',
  styleUrl: './edit-trip.css',
  templateUrl: './edit-trip.html',
  providers: [DatePipe]
})
export class EditTrip implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message : string = '';

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  constructor(
    private cdf: ChangeDetectorRef,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripData
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      void this.router.navigate(['']);
      return;
    };
    // console.log('EditTripComponent::ngOnInit');
    // console.log('tripcode:' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip) => {
          this.trip = value;
          // With zone-less angular, the form doesn't update without this call to markForCheck() to trigger change detection.
          // Plan to convert to Ng22 syntax with the capstone so following the guide exactly.
          this.cdf.markForCheck();

          // Populate our record into the form
          this.editForm.patchValue({
            name: this.trip.name,
            length: this.trip.length,
            start: this.formattedDate(this.trip.start),
            resort: this.trip.resort,
            perPerson: this.trip.perPerson,
            image: this.trip.image,
            description: this.trip.description
          });

          if(!value)
          {
            this.message = 'No Trip Retrieved!';
          }
          else{
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
          // console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  };

  /**
   * Formats date string to yyyy-mm-dd format for input type="date" field
   * This could be done using the Date object, but angular has a built-in DatePipe
   * that can be used to format dates.
   * @param {string} dateString
   * @returns {string}
   */
  formattedDate(dateString: string): string | null {
    if (!dateString) {
      return '';
    }
    return this.datePipe.transform(dateString, 'yyyy-MM-dd');
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            // console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }
}
