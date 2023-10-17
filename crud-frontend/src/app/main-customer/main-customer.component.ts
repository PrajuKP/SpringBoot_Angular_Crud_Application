import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css']
})

export class MainCustomerComponent {
tab: any;

}
