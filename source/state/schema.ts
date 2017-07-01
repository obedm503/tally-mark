import { schema } from 'normalizr';

export const team = new schema.Entity('teams', {});

export const game = new schema.Entity('games', {
  teams: [ team ],
});

team.define({
  games: [ game ],
});

export const main = {
  teams: [ team ],
  games: [ game ],
};
