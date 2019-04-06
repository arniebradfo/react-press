import axios, { AxiosResponse } from 'axios';
import { IWpPost } from '../../types/wp-rest-api';
import { ThunkDispatch } from 'redux-thunk';

export const GET_POSTS = 'GET_POSTS'

interface GetPostsAction {
	type: typeof GET_POSTS
	posts: IWpPost[];
}

export type PostActionTypes = GetPostsAction;

export const getPosts = (count: number) => {

	return (dispatch:ThunkDispatch<{}, {}, any>) => {
		// do async

		const _wpDomain = '//localhost:8888/'; // replace with publicPath
		const _wpRest = _wpDomain + 'wp-json/wp/v2/';
		const _wpMenus = _wpDomain + 'wp-json/wp-api-menus/v2/';
		// const _ngWp = _wpDomain + 'wp-json/ngwp/v2/';
		const type = 'posts';
		let page = 1;
		const perPage = count; // the max allowed by WP

		axios.get(_wpRest + `${type}?per_page=${perPage}&page=${page}`)
			.then((res:AxiosResponse<IWpPost[]>) => {
				console.log(res);
				dispatch({
					type: GET_POSTS,
					posts: res.data
				});
			});
	}
}
