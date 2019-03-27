import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService) {
      if (this.userService.currentTokenValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }

    const { Email, Password } = this.loginForm.value;
    this.spinner.show();

    this.userService.login(Email, Password)
      .subscribe(
        data => {
          this.notifier.notify('success', 'Signed in successfully');
          this.spinner.hide();
          this.router.navigate(['/']);
        },
        ({ error }) => {
          this.notifier.notify('error', error.message);
          this.spinner.hide();
        });
  }

  onReset() {
    this.loginForm.reset();
  }

}
