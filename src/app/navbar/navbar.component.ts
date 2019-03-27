import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isCollapsed = true;

  constructor(private userSerivce: UserService, private notifier: NotifierService) { }

  public get IsLoggedIn() {
    return this.userSerivce.currentTokenValue != null;
  }

  public get IsLoggedOut() {
    return this.userSerivce.currentTokenValue == null;
  }

  logout() {
    this.userSerivce.logout();
    this.notifier.notify('success', 'Logged out');
  }
}
