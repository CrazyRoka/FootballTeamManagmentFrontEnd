import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Team } from '../team';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  constructor(
    private router: Router,
    private teamService: TeamService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }

  ngOnInit() {
    this.spinner.show();
    this.teamService.getTeams()
      .subscribe((res: Team[]) => {
        this.teams = res;
        console.log(this.teams);
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
  }

  onEdit(index: number) {
    if(index < 0 || index >= this.teams.length) {
      return;
    }
    this.router.navigate(['teams/details', this.teams[index].id]);
  }

  onDelete(index: number) {
    this.spinner.show();
    this.teamService.deleteTeam(this.teams[index].id)
      .subscribe(
        data => {
          this.spinner.hide();
          this.notifier.notify('success', 'Team deleted');
          this.teams.splice(index, 1);
        }, error => {
          this.spinner.hide();
          this.notifier.notify('error', error.status);
        }
      )
  }

  onNew() {
    this.router.navigate(['/teams/add']);
  }

}
