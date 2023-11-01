import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string ="";
  password: string ="";

  customerForm:FormGroup | any;


  constructor(private router: Router,private http: HttpClient, private formBuilder: FormBuilder ) {}


  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Login() 
  {
    if (this.customerForm.valid) {
    console.log(this.email);
    console.log(this.password);

    const bodyData = {
      "email": this.customerForm.get('email').value,
      "password": this.customerForm.get('password').value,
    };

        this.http.post("http://localhost:8084/api/v1/employee/login", bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);

        if (resultData.message == "Email not exits")
        {
          alert("Email not exits");
        }
        else if(resultData.message == "Login Success")
        {
          this.router.navigateByUrl('/home');
        }
        else
        {
          alert("Incorrect Email and Password not match");
        }
        this.customerForm.reset();
      });
    }
  }
}