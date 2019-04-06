import axios from 'axios';


export type IReactPressActions = 'GET_POSTS'

export const getPosts = (count:number) => {
	
	return (dispatch:any, getState:any) => {
		// do async

		const _wpDomain = '//localhost:8888/'; // replace with publicPath
		const _wpRest = _wpDomain + 'wp-json/wp/v2/';
		const _wpMenus = _wpDomain + 'wp-json/wp-api-menus/v2/';
		// const _ngWp = _wpDomain + 'wp-json/ngwp/v2/';
		const type = 'posts';
		let page = 1;
		const perPage = count; // the max allowed by WP

		axios.get(_wpRest + `${type}?per_page=${perPage}&page=${page}`)
			.then( res => {
				console.log(res); 
				dispatch( { 
					type:'GET_POSTS', 
					count: count,
					posts: res.data
				});
			});
	}
}
