import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.module.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { IReactPressState } from './redux/reducers/rootReducer';
import { getPosts } from './redux/actions/actions';


class App extends Component {


	private _wpDomain: string = '//localhost:8888/'; // replace with publicPath
	private _wpRest: string = this._wpDomain + 'wp-json/wp/v2/';
	private _wpMenus: string = this._wpDomain + 'wp-json/wp-api-menus/v2/';
	// private _ngWp: string = this._wpDomain + 'wp-json/ngwp/v2/';
	

	constructor(props: any) {
		super(props)

		console.log(props);
		
		props.getPosts(10);

		const type = 'posts';
		let page = 1;
		const perPage = 100; // the max allowed by WP
		axios.get(this._wpRest + `${type}?per_page=${perPage}&page=${page}`)
			.then( res => {
				console.log(res); 
			})
	}

	render() {
		return (
			<div className={style.app}>
				<header className={style["app-header"]}>
					<img src={logo} className={style["app-logo"]} alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
         			</p>
					<a
						className={style["app-link"]}
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
						>
						Learn React
         			</a>
				</header>
			</div>
		);
	}
}

const mapStateToProps = (state: IReactPressState, ownProps:any) => {
	// ... computed data from state and optionally ownProps
	return {
		posts: state.posts
	}
}

const mapDispatchToProps = (dispatch:Function) => {
	return {
		getPosts: (count:number) => {
			dispatch( getPosts(count) )
		} 
	}
	// ... normally is an object full of action creators
}
 
export default connect( mapStateToProps, mapDispatchToProps )(App);
 