import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private notifier: NotifierService) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      OldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      NewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])
    })
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const { OldPassword, NewPassword } = this.passwordForm.value;
    this.spinner.show();
    this.userService.changePassword(OldPassword, NewPassword)
      .subscribe(
        data => {
          this.spinner.hide();
          this.notifier.notify('success', 'Password changed successfully');
        },
        error => {
          this.spinner.hide();
        }
      )
  }

  onReset() {
    this.passwordForm.reset();
  }

}
