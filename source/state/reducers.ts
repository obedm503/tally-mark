import { normalize } from 'normalizr';
import { types } from './actions';

export default function reducer( state = {}, action ){
  switch ( action.type ){
    case types.ADD_GAME:
      return addGame(state, action);
    case types.NORMALIZE:
      return normalize(state, action.payload);
    default:
      return state;
  }
}

function addGame(state, action){
  return state;
}
