import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-customer',
  templateUrl:'./customer.component.html',
  styleUrls:['./customer.component.css']
})
export class CustomerComponent {


  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  

  // customername: string ="";
  // customeraddress: string ="";
  // mobile: Number =0;

  currentCustomerID = "";

  customerForm:FormGroup | any;
  submitted = false;  
  

constructor(private http: HttpClient, private formBuilder: FormBuilder) //private formBuilder: FormBuilder
  {

    this.getAllCustomer();
 
  }

  


ngOnInit() {
  this.customerForm = this.formBuilder.group({
    customername: ['', Validators.required],
    customeraddress: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]]
  });
}


  getAllCustomer()
  {
    
    this.http.get("http://localhost:8084/api/v1/customer/getAllCustomer")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData.reverse();
    });
  }

  register() {
    if (this.customerForm.valid) {  // Check if the form is valid
        const bodyData = {
            "customername": this.customerForm.get('customername').value,
            "customeraddress": this.customerForm.get('customeraddress').value,
            "mobile": this.customerForm.get('mobile').value
        };

        this.http.post("http://localhost:8084/api/v1/customer/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
            console.log(resultData);
            alert("Customer Registered Successfully");
            this.getAllCustomer();
            this.customerForm.reset();
        });
    }
}


setUpdate(data: any) {
  this.customerForm.controls['customername'].setValue(data.customername);
  this.customerForm.controls['customeraddress'].setValue(data.customeraddress);
  this.customerForm.controls['mobile'].setValue(data.mobile);
  this.currentCustomerID = data.customerid;
}

UpdateRecords() {
    if (this.customerForm.valid) {  // Checking if the form is valid
        const bodyData = {
            "customerid": this.currentCustomerID,
            "customername": this.customerForm.get('customername').value,
            "customeraddress": this.customerForm.get('customeraddress').value,
            "mobile": this.customerForm.get('mobile').value
        };

        this.http.put("http://localhost:8084/api/v1/customer/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
            console.log(resultData);
            alert("Customer Updated Successfully");
            this.getAllCustomer();
            this.customerForm.reset(); 
        });
    }
}
 
  save() {
      if (this.currentCustomerID === '') {

        this.register();
      } else {
        this.UpdateRecords();
      }
  }   
 
  setDelete(data: any)
  {
    
    const isConfirmed = window.confirm('Are you sure you want to delete this customer?');
    if (isConfirmed) {
    this.http.delete("http://localhost:8084/api/v1/customer/deletecustomer"+ "/"+ data.customerid,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Deleted")
        this.getAllCustomer();
        
        this.customerForm.customername = '';
        this.customerForm.customeraddress = '';
        this.customerForm.mobile  = 0;
  
    });
    }
  }
 }
