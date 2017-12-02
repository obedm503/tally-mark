import { schema } from 'normalizr';

export const team = new schema.Object({});

export const game = new schema.Object({
  teams: [team],
});

team.define({
  games: [game],
});

export const main = new schema.Entity( 'main', {
  teams: [team],
  games: [game],
});
