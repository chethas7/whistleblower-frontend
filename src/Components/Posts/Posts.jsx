import React from 'react';
import './Posts.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import { useEffect } from 'react';
import { getTimelinePosts } from '../../Actions/postAction';
import { showPost } from '../../Api/postRequest';
import { useState } from 'react';

const Posts = ({showallpost,post}) => {
  const dispatch = useDispatch();
  // const [post,setpost] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
console.log(posts);

// const showallpost = async () =>{
// const response = await showPost()
// console.log(response.data.showPost,"lllll")
// setpost(response.data.showPost)
// }
console.log(post,"allpost iiiiiiiiii")


useEffect(()=>{
  showallpost()
},[])

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  
  if (!posts) return 'no posts';
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? 'Fetching Posts...'
        // : posts.map((post, id) => {
        //     return <Post data={post} id={id} />;
        //   })}
        : post?.map((post) => {
          return <Post data={post}  allpost={showallpost}/>;
        })}
    </div>
  );
};

export default Posts;
