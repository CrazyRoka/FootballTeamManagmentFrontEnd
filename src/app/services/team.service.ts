import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
        catchError(this.handleError('getProducts', []))
      );
  }

  getTeam(id: number): Observable<Team> {
    const url = `${apiUrl}/teams/${id}`;
    return this.http.get<Team>(url)
      .pipe(
        tap(_ => console.log(`fetched team id=${id}`)),
        catchError(this.handleError<Team>(`getTeam id=${id}`))
      );
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${apiUrl}/teams`, team)
      .pipe(
        tap((t: Team) => console.log(`added team w/ id=${t.id}`)),
        catchError(this.handleError<Team>('addTeam'))
      );
  }

  updateTeam(team: Team): Observable<any> {
    const url = `${apiUrl}/teams/${team.id}`;
    return this.http.put(url, team)
      .pipe(
        tap(_ => console.log(`updated team id=${team.id}`)),
        catchError(this.handleError<any>('updateTeam'))
      );
  }

  deleteTeam(id: number): Observable<Team> {
    const url = `${apiUrl}/teams/${id}`;
    return this.http.delete<Team>(url)
      .pipe(
        tap(_ => console.log(`deleted product id=${id}`)),
        catchError(this.handleError<Team>('deleteTeam'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.notifier.notify('error', error);
      return of(result as T);
    };
  }
}
