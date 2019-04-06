import {combineReducers} from 'redux';
import postReducer from './post.reducer';
import settingsReducer from './settings.reducer';


// Typescript with redux: https://redux.js.org/recipes/usage-with-typescript

const rootReducer = combineReducers({
	posts: postReducer,
	settings: settingsReducer,
})

export default rootReducer;
