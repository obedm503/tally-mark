import * as schema from './schema';
import db from './db';

const types: any = {};
const creators: any = {};

types.ADD_GAME = 'ADD_GAME';
creators.addGame = game => {
  return {
    type: types.ADD_GAME,
    payload: game,
  };
};

types.NORMALIZE = 'NORMALIZE';
creators.normalize = () => {
  return {
    type: types.NORMALIZE,
    payload: schema.main,
  };
};

types.SAVE = 'SAVE';
creators.save = () => {
  return {
    type: types.SAVE,
    payload: schema.main,
  };
};

export {
  types,
  creators,
};
