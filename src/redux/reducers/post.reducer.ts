import { IWpPost } from "../../types/wp-rest-api";
import { PostActionTypes } from "../actions/post.actions";

const initState: IWpPost[] = [];

const postReducer = (
	state = initState,
	action: PostActionTypes
) => {
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

export default postReducer;