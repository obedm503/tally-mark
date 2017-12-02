export class Teams {
  getTeams(){
    return [
      {
        name: 'team a',
        route: { route: 'team-a', name: 'team-a', moduleId: 'components/team', nav: true, title: 'Team A' },
      },
      {
        name: 'team b',
        route: { route: 'team-b', name: 'team-b', moduleId: 'components/team', nav: true, title: 'Team B' },
      },
      {
        name: 'team c',
        route: { route: 'team-c', name: 'team-c', moduleId: 'components/team', nav: true, title: 'Team C' },
      },
    ];
  }
}
