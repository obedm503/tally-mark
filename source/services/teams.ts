export class Teams {
  getTeams(){
    return [
      {
        name:'team a',
        route: { route: 'team-a', name: 'team-a', moduleId: 'elements/team', nav: true, title: 'Team A' }
      },
      {
        name:'team b',
        route: { route: 'team-b', name: 'team-b', moduleId: 'elements/team', nav: true, title: 'Team B' }
      },
      {
        name:'team c',
        route: { route: 'team-c', name: 'team-c', moduleId: 'elements/team', nav: true, title: 'Team C' }
      }
    ];
  }
}
