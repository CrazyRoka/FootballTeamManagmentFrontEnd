import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../services/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FootballPlayer } from '../footballPlayer';
import { FootballPlayerService } from '../services/football-player.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  teamForm: FormGroup;
  players: FootballPlayer[] = [];
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: FootballPlayerService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    this.spinner.show();
    this.teamForm = new FormGroup({
      Name: new FormControl('')
    });

    this.teamService.getTeam(this.id).subscribe(
      data => {
        this.teamForm = new FormGroup({
          Name: new FormControl(data.name, [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]{1,}$/)
          ]),
          id: new FormControl(data.id)
        });
        this.players = data.footballPlayers;
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
          this.spinner.hide();
        },
        ({ error }) => {
          this.spinner.hide();
        });
  }

  onNew() {
    this.router.navigate(['/players/add', { teamId: this.id }]);
  }

  onDelete(index: number) {
    if(index < 0 || index >= this.players.length) {
      return;
    }
    this.spinner.show();
    this.playerService.deleteFootballPlayer(this.players[index].id)
      .subscribe(
        data => {
          this.spinner.hide();
          this.players.splice(index, 1);
        },
        error => {
          this.spinner.hide();
        }
      );
  }

  onEdit(index: number) {
    if(index < 0 || index >= this.players.length) {
      return;
    }
    this.router.navigate(['/players/details', this.players[index].id]);
  }
}
