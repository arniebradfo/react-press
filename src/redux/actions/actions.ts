export const getPosts = (count:number) => {
	return { 
		type:'GET_POSTS', 
		count: count 
	}
}