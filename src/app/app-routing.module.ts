import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
