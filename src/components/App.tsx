import React, { Component } from 'react';
import style from './App.module.scss';
import { connect } from 'react-redux';
import { IReactPressState } from '../redux/reducers/root.reducer';
import { getPosts } from '../redux/actions/post.actions';


class ReactPressApp extends Component {

	constructor(props: any) {
		super(props)
		console.log(props);
		props.getPosts(10);
	}

	render() {
		return (
			<h1>WordPress &amp; React</h1>
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
		getPosts: (count:number) => { dispatch( getPosts(count) ) } 
	}
	// ... normally is an object full of action creators
}
 
export default connect( mapStateToProps, mapDispatchToProps )(ReactPressApp);
 