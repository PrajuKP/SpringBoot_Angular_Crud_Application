import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

export class ResetComponent {
  resetPasswordForm: FormGroup | any;
  error: string ='';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient) // private route: ActivatedRoute, private router: Router,
  {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]], 
      confirmPassword: ['', [Validators.required]],
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

      if (newPassword === confirmPassword) {
        const resetPasswordData = {
          email: email,
          newPassword: newPassword,
        };

        this.http.post("http://localhost:8084/api/v1/employee/reset_password", resetPasswordData, {responseType: 'text'})
          .subscribe({
            next: () => { 
              this.resetPasswordForm.reset();
              this.error = 'Password reset successful.';
              this.router.navigateByUrl('/login');
            },
            error: (error) => {
              this.error = 'Password reset failed. ';
            }
          });
      } else {
        this.error = 'Password and confirm password do not match.';
      }

      
    }
  }

}
