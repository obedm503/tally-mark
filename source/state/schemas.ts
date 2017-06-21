/**
 *
 */
import { schema } from 'normalizr';

const team = {
  games: [ game ],
};
const game = {
  teams: [ team ],
};

const schemas = {
  teams: [ team ],
  games: [ game ],
};

export default schemas;
