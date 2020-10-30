import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ITeam } from '../interfaces/team.interface';
import { IUser } from '../interfaces/user.interface';

import { ApiService } from './api.service';

@Injectable()
export class TeamService {
  private teamUrl = '/teams';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<ITeam[]> {
    return this.apiService.get(`${this.teamUrl}`);
  }

  get(teamId: string): Observable<ITeam> {
    return this.apiService.get(`${this.teamUrl}/${teamId}`);
  }

  getTeamMembers(team: ITeam): Observable<IUser[]> {
    return this.apiService.get(`${this.teamUrl}/${team.businessId}/members`);
  }

  createTeam(team: ITeam): Observable<ITeam> {
    return this.apiService.post(`${this.teamUrl}`, team);
  }

  updateTeam(businessId: string, team: ITeam): Observable<ITeam> {
    return this.apiService.put(`${this.teamUrl}/${businessId}`, team);
  }

  createTeamMembers(teamId: string, members: IUser[]): Observable<IUser[]> {
    const users = members.map((user) => {
      return user.businessId;
    });
    return this.apiService.post(`${this.teamUrl}/${teamId}/members`, { users });
  }

  removeTeam(teamId: string): Observable<ITeam[]> {
    return this.apiService.remove(`${this.teamUrl}/${teamId}`);
  }

  removeTeamMember(teamId: string, member: IUser): Observable<IUser[]> {
    return this.apiService.remove(
      `${this.teamUrl}/${teamId}/members/${member.businessId}`
    );
  }
}
