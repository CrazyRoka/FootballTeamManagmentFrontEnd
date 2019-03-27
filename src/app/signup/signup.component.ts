import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService) {
      if (this.userService.currentTokenValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.registerForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      FirstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]{1,}$/)
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]{1,}$/)
      ])
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
        return;
    }

    this.spinner.show();
    this.userService.register(this.registerForm.value)
      .subscribe(
        data => {
          this.notifierService.notify('success', 'Registration successful');
          this.spinner.hide();
          this.router.navigate(['/login']);
        },
        ({ error }) => {
          this.notifierService.notify('error', error.message);
          this.spinner.hide();
        });
  }

  onReset() {
    this.registerForm.reset();
  }
}
