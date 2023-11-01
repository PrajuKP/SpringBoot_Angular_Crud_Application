import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  employeename: string ="";
  email: string ="";
  password: string ="";

  customerForm:FormGroup | any;
  registrationSuccess: boolean = false;




  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router)
  {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      employeename: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  save()
  {
    if (this.customerForm.valid) {  
  
    const bodyData = {
      "employeename" : this.customerForm.get('employeename').value,
      "email" : this.customerForm.get('email').value,
      "password" : this.customerForm.get('password').value,
    };
    this.http.post("http://localhost:8084/api/v1/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
        this.registrationSuccess = true;
        this.customerForm.reset();
    });

    this.router.navigate(['/login']);
  }
  }
}
