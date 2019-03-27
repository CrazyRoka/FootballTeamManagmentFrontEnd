import { Component, OnInit } from '@angular/core';
import { FootballPlayer } from '../footballPlayer';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FootballPlayerService } from '../services/football-player.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: FootballPlayer[] = [];

  constructor(
    private router: Router,
    private playerService: FootballPlayerService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.playerService.getFootballPlayers()
      .subscribe((res: FootballPlayer[]) => {
        this.players = res;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }

  onNew() {
    this.router.navigate(['/players/add']);
  }

  onDelete(index: number) {
    if (index < 0 || index >= this.players.length) {
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
    if (index < 0 || index >= this.players.length) {
      return;
    }
    this.router.navigate(['/players/details', this.players[index].id]);
  }
}
