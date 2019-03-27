import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../team';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { FootballPlayerService } from '../services/football-player.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-football-player',
  templateUrl: './edit-football-player.component.html',
  styleUrls: ['./edit-football-player.component.scss']
})
export class EditFootballPlayerComponent implements OnInit {

  playerForm: FormGroup;
  teams: Team[] = [];
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService,
    private playerService: FootballPlayerService,
    private spinner: NgxSpinnerService) {
      if (!this.userService.currentTokenValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    this.playerForm = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      TeamId: new FormControl('')
    });

    const teamsFetch = this.teamService.getTeams();
    const playerFetch = this.playerService.getFootballPlayer(this.id);
    forkJoin([teamsFetch, playerFetch])
      .subscribe(
        results => {
          this.teams = results[0];
          const player = results[1];
          this.playerForm = new FormGroup({
            FirstName: new FormControl(player.firstName, [
              Validators.required,
              Validators.pattern(/^[A-Z][a-z]{1,}$/)
            ]),
            LastName: new FormControl(player.lastName, [
              Validators.required,
              Validators.pattern(/^[A-Z][a-z]{1,}$/)
            ]),
            TeamId: new FormControl(player.teamId, [Validators.required]),
            id: new FormControl(player.id)
          });
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.router.navigate(['/players']);
        });
  }

  onSubmit() {
    if (this.playerForm.invalid) {
        return;
    }

    this.spinner.show();
    this.playerService.updateFootballPlayer(this.playerForm.value)
      .subscribe(
        data => {
          this.spinner.hide();
        },
        ({ error }) => {
          this.spinner.hide();
        });
  }
}
