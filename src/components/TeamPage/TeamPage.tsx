/*tslint:disable: no-console no-debugger*/
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getTeamsArticles, getTeamNames } from '../../api';
import { TeamLogo } from '../TeamLogo';
import { Team } from '../Team';
import { IPage, ITeamPageState } from '../_types';
import * as slug from 'slug';
import { Loading } from '../Loading';

export default class TeamPage extends React.Component<IPage, ITeamPageState> {
  constructor(props: IPage) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      teamNames: []
    };
  }

  componentDidMount() {
    Promise.all([getTeamNames(), getTeamsArticles(this.props.match.params.teamId)]).then(
      ([teamNames, articles]): void => {
        this.setState(() => ({
          loading: false,
          articles,
          teamNames
        }));
      }
    );
  }

  render() {
    const { loading, articles, teamNames } = this.state;
    const { match } = this.props;
    const { teamId } = match.params;

    if (loading === false && teamNames.includes(teamId) === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Team id={teamId}>
          {(team: any) =>
            team === null ? (
              <h1>
                <Loading text="Loading" />
              </h1>
            ) : (
              <div className="panel">
                <TeamLogo id={teamId} />
                <h1 className="medium-header">{team.name}</h1>
                <h4 style={{ margin: 5 }}>
                  <Link style={{ cursor: 'pointer' }} to={{ pathname: '/players', search: `?teamId=${teamId}` }}>
                    View Roster
                  </Link>
                </h4>
                <ul className="chanmpionships">
                  {team.championships.map((ship: any) => (
                    <li key={ship}>{ship}</li>
                  ))}
                </ul>
                <ul className="info-list row" style={{ width: '100%' }}>
                  <li>
                    Established
                    <div>{team.established}</div>
                  </li>
                  <li>
                    Manager
                    <div>{team.manager}</div>
                  </li>
                  <li>
                    Coach
                    <div>{team.coach}</div>
                  </li>
                  <li>
                    Record
                    <div>
                      {team.wins} - {team.losses}
                    </div>
                  </li>
                </ul>
                <h2 className="header">Articles</h2>
                <ul className="articles">
                  {articles.map((article: { id: string; title: string; date: Date }) => (
                    <li key={article.id}>
                      <Link to={`${match.url}/articles/${slug(article.title)}`}>
                        <h4 className="article-title">{article.title}</h4>
                        <div className="article-date">{article.date.toLocaleDateString()}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        </Team>
      </div>
    );
  }
}
