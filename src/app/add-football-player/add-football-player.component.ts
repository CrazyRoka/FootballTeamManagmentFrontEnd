import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeamService } from '../services/team.service';
import { Team } from '../team';
import { FootballPlayerService } from '../services/football-player.service';

@Component({
  selector: 'app-add-football-player',
  templateUrl: './add-football-player.component.html',
  styleUrls: ['./add-football-player.component.scss']
})
export class AddFootballPlayerComponent implements OnInit {

  playerForm: FormGroup;
  teams: Team[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: FootballPlayerService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('teamId');

    this.playerForm = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      TeamId: new FormControl(teamId)
    });

    this.teamService.getTeams()
      .subscribe(
        data => {
          this.teams = data;
          this.playerForm = new FormGroup({
            FirstName: new FormControl('', [
              Validators.required,
              Validators.pattern(/^[A-Z][a-z]{1,}$/)
            ]),
            LastName: new FormControl('', [
              Validators.required,
              Validators.pattern(/^[A-Z][a-z]{1,}$/)
            ]),
            TeamId: new FormControl(teamId, [Validators.required])
          });
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.router.navigate(['/teams/details', teamId]);
        }
      )
  }

  onSubmit() {
    if (this.playerForm.invalid) {
        return;
    }

    this.spinner.show();
    this.playerService.addFootballPlayer(this.playerForm.value)
      .subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['/teams/details', this.playerForm.value.TeamId]);
        },
        ({ error }) => {
          this.spinner.hide();
        });
  }
}
