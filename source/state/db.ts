import { remote } from 'electron';

const low = remote.require( 'lowdb' );
const db = low( `${ remote.app.getPath( 'userData' ) }/db.json` );

db.defaults({}).write();

export function get(){
  return db.value();
}

export function set( state ){
  db.setState( state ).write();
}
