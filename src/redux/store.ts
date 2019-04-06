import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root.reducer";
import thunkMiddleware from 'redux-thunk';


export const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware
	)
);