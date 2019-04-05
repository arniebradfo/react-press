import { Action } from "redux";

export type IReactPressState = {
	posts: any[]
}

const initState: IReactPressState = {
	posts: []
	// global state includes:
	// posts
	// types
	// pages
	// ...everything available through the WP API
}

const rootReducer = (state=initState, action:Action<any>) => {
	console.log(action);
	switch (action.type) {
		case 'GET_POSTS':
			return state;
			break;
		default:
			break;
	}
	return state;
} 

export default rootReducer;