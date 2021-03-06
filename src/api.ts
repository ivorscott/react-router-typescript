import { teams, players, generateArticle, generateTeamsArticles } from './dummy-data';
import { IPlayerDetails } from './components/_types';

let cachedPlayers: any = null;
const cachedTeams: any = {};
let cachedTeamNames: any = null;

export function getPlayers(teamId: any): Promise<IPlayerDetails[]> {
  return new Promise(res => {
    if (cachedPlayers === null) {
      cachedPlayers = players;
      return setTimeout(() => res(teamId ? teams[teamId].players : cachedPlayers), 800);
    }

    return res(teamId ? teams[teamId].players : cachedPlayers);
  });
}

export function getTeam(teamId: string): Promise<any[]> {
  return new Promise(res => {
    if (typeof cachedTeams[teamId] === 'undefined') {
      cachedTeams[teamId] = teams[teamId];
      return setTimeout(() => res(cachedTeams[teamId]), 800);
    }

    return res(cachedTeams[teamId]);
  });
}

export function getTeamNames(): Promise<any> {
  return new Promise(res => {
    if (cachedTeamNames === null) {
      cachedTeamNames = Object.keys(teams);
      return setTimeout(() => res(cachedTeamNames), 400);
    }

    return res(cachedTeamNames);
  });
}

export function getArticle(teamId: string, id: any): Promise<any> {
  return new Promise(res => {
    setTimeout(() => res(generateArticle(teamId, id)), 700);
  });
}

export function getTeamsArticles(teamId: string): Promise<any> {
  return new Promise(res => {
    setTimeout(() => res(generateTeamsArticles(teamId)), 700);
  });
}
