import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css']
})

export class MainCustomerComponent {
tab: any;
showNavBar: boolean;

  constructor(private router: Router) {
    this.showNavBar = false;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const allowedRoutes = ['/home', '/customer'];
        this.showNavBar = allowedRoutes.includes(event.url);
      }
    });
  }

}
