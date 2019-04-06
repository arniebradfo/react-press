import { Action, AnyAction } from "redux";
import { IReactPressActions } from "../actions/post.actions";

// Typescript with redux: https://redux.js.org/recipes/usage-with-typescript

export type IReactPressState = {
	isLoadingPosts: boolean,
	posts: any[]
}

const initState: IReactPressState = {
	isLoadingPosts: false,
	posts: []
	// global state includes:
	// posts
	// types
	// pages
	// ...everything available through the WP API
}

const rootReducer = (state=initState, action:any) => {
	switch (action.type) {
		case 'GET_POSTS':
			return {
				...state,
				posts: action.posts
			};
			break;
		default:
			return state;
			break;
	}
} 

export default rootReducer;
