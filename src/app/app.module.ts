import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NotifierModule } from 'angular-notifier';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TeamsComponent } from './teams/teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    TeamsComponent,
    AddTeamComponent,
    TeamDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'
        },
        vertical: {
          position: 'top',
          distance: 80
        }
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
