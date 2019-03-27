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
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.teamService.getTeams()
      .subscribe((res: Team[]) => {
        this.teams = res;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }

  onEdit(index: number) {
    if(index < 0 || index >= this.teams.length) {
      return;
    }
    this.router.navigate(['/teams/details', this.teams[index].id]);
  }

  onDelete(index: number) {
    if(index < 0 || index >= this.teams.length) {
      return;
    }
    this.spinner.show();
    this.teamService.deleteTeam(this.teams[index].id)
      .subscribe(
        data => {
          this.spinner.hide();
          this.teams.splice(index, 1);
        }, error => {
          this.spinner.hide();
        }
      )
  }

  onNew() {
    this.router.navigate(['/teams/add']);
  }

}
