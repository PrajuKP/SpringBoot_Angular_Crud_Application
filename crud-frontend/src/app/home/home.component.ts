import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  totalCustomers: number = 0;
  error: string = '';
  baseUrl = '';
  response: any;
  recentCustomer:any;
  recentCustomerAddress:any = "";

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:8084';
  }

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.http.get<any>(this.baseUrl+"/api/v1/customer/getAllCustomerCount").subscribe({
  next: (response) => {
    this.totalCustomers = response.length; 
  },
  error: (error) => {
    this.error = 'Error fetching total customers: ' + error;
  }
});


this.http.get<any>(this.baseUrl+"/api/v1/customer/getAllCustomer").subscribe({
  next: (response) => {
    if (response && response.length > 0) {
      this.recentCustomer = response[response.length - 1].customerid;
    } 
  },
  error: (error) => {
    this.error = 'Error fetching total customers: ' + error;
  }
});


this.http.get<any>(this.baseUrl+"/api/v1/customer/getAllCustomer").subscribe({
  next: (response) => {
    if (response && response.length > 0) {
      this.recentCustomerAddress = response[response.length - 1].customeraddress;
    } 
  },
  error: (error) => {
    this.error = 'Error fetching total customers: ' + error;
  }
});


  }
}