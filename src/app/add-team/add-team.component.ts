import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  teamForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private teamService: TeamService,
    private spinner: NgxSpinnerService) {
      if (!this.userService.currentTokenValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.teamForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]{1,}$/)
      ])
    });
  }

  onSubmit() {
    if (this.teamForm.invalid) {
        return;
    }

    this.spinner.show();
    this.teamService.addTeam(this.teamForm.value)
      .subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['/teams']);
        },
        ({ error }) => {
          this.spinner.hide();
        });
  }

  onReset() {
    this.teamForm.reset();
  }
}
