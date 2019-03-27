import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../services/team.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  teamForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService) {
      if (this.userService.currentTokenValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => id = params.id);
    this.spinner.show();
    this.teamForm = new FormGroup({
      Name: new FormControl('')
    });

    this.teamService.getTeam(id).subscribe(
      data => {
        this.teamForm = new FormGroup({
          Name: new FormControl(data.name, [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]{1,}$/)
          ]),
          id: new FormControl(data.id)
        });
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.router.navigate(['/teams']);
      }
    )
  }

  onSubmit() {
    if (this.teamForm.invalid) {
        return;
    }

    this.spinner.show();
    this.teamService.updateTeam(this.teamForm.value)
      .subscribe(
        data => {
          this.notifierService.notify('success', 'Updated team successfully');
          this.spinner.hide();
        },
        ({ error }) => {
          this.notifierService.notify('error', error.message);
          this.spinner.hide();
        });
  }

  onReset() {
    this.teamForm.reset();
  }

}
