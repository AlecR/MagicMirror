import { combineReducers } from 'redux';
import popouts from './popouts';
import activePopout from './activePopout';

export default combineReducers({
  popouts,
  activePopout
})
