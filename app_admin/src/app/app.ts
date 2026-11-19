import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';

@Component({
  imports: [RouterOutlet, Navbar],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Travlr Gateways Admin!';
}
