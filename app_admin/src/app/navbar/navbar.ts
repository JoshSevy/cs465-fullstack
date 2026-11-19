import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Authentication } from '../services/authentication';
import { NgIf } from '@angular/common';

@Component({
  imports: [ RouterModule, NgIf ],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  constructor(
    private authenticationService: Authentication
  ) { }

  ngOnInit() { }

  public onLogout(): void {
    return this.authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
