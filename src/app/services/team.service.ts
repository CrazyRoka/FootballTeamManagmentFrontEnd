import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Team } from '../team';
import { apiUrl } from '../globals';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient, private notifier: NotifierService) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${apiUrl}/teams`)
      .pipe(
        tap(_ => console.log('fetched teams')),
        catchError(this.handleError())
      );
  }

  getTeam(id: number): Observable<Team> {
    const url = `${apiUrl}/teams/${id}`;
    return this.http.get<Team>(url)
      .pipe(
        tap(_ => console.log(`fetched team id=${id}`)),
        catchError(this.handleError())
      );
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${apiUrl}/teams`, team)
      .pipe(
        tap((t: Team) => {
          console.log(`added team id=${t.id}`);
          this.notifier.notify('success', 'Added team successfully');
        }),
        catchError(this.handleError())
      );
  }

  updateTeam(team: Team): Observable<Team | object> {
    const url = `${apiUrl}/teams/${team.id}`;
    return this.http.put(url, team)
      .pipe(
        tap(_ => {
          console.log(`updated team id=${team.id}`);
          this.notifier.notify('success', 'Updated team successfully');
        }),
        catchError(this.handleError())
      );
  }

  deleteTeam(id: number): Observable<Team> {
    const url = `${apiUrl}/teams/${id}`;
    return this.http.delete<Team>(url)
      .pipe(
        tap(_ => {
          console.log(`deleted product id=${id}`)
          this.notifier.notify('success', 'Deleted team successfully');
        }),
        catchError(this.handleError())
      );
  }

  private handleError() {
    return (error: any): Observable<any> => {
      console.log(error);
      this.notifier.notify('error', error.statusText);
      return throwError(error);
    };
  }
}
