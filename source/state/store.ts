import { createStore } from 'redux';
import rootReducer from './reducers';
import * as db from './db';

const store = createStore( rootReducer, db.get() );

// update local db
store.subscribe( () => {
  db.set( store.getState() );
});

export default store;
