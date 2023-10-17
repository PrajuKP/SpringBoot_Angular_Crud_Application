import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  totalCustomers: number = 0;
  error: string ='';
  // customerid: number =0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<number>('api/v1/customer/getAllCustomer').subscribe({
      next: (totalCustomers) => {
        this.totalCustomers = totalCustomers;
      },
      error: (error) => {
        this.error = 'Error fetching total customers: ' + error;
      }
    });
  }
  
}
