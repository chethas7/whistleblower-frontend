import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTimelinePosts, getUserPost, showPost } from '../../Api/postRequest';
import Posts from '../Posts/Posts';
import PostShare from '../PostShare/PostShare';
import './PostSide.css';

const PostSide = ({select}) => {
  const [post, setpost] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();
  const showallpost = async () => {
    if (select === 'profile') {
      const response = await getUserPost(id);
      console.log(response.data.showPost,";lllllllllllllllllll");
      setpost(response.data.showPost)
    }
    else{

      const response = await getTimelinePosts(user._id);
      console.log(response.data, 'lllll');
      setpost(response.data.currentUserPosts);
    }
    // const response = await showPost();
  };
  return (
    <div>
      <div className="PostSide">
        <PostShare showallpost={showallpost} />
        <Posts showallpost={showallpost} post={post} />
        {/* <Posts/> */}
      </div>
    </div>
  );
};

export default PostSide;
