import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { AddFootballPlayerComponent } from './add-football-player/add-football-player.component';
import { EditFootballPlayerComponent } from './edit-football-player/edit-football-player.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'teams/add',
    component: AddTeamComponent
  },
  {
    path: 'teams/details/:id',
    component: TeamDetailsComponent
  },
  {
    path: 'players/add',
    component: AddFootballPlayerComponent
  },
  {
    path: 'players/details/:id',
    component: EditFootballPlayerComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
