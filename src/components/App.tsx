import React, { Component } from 'react';
import style from './App.module.scss';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/post.actions';
import { ThunkDispatch } from 'redux-thunk';


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

const mapStateToProps = (state:any, ownProps:any) => {
	return {
		posts: state.posts
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
	return {
		getPosts: (count:number) => { dispatch( getPosts(count) ) } 
	}
}
 
export default connect( mapStateToProps, mapDispatchToProps )(ReactPressApp);

connect(mapStateToProps, )
