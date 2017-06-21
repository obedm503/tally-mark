import schemas from './schemas';

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
    type: types.normalize,
    payload: schemas,
  };
};

export {
  types,
  creators,
};