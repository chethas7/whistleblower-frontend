import React from 'react';
import './Post.css';

import Comment from '../../Image/comment.png';
import Share from '../../Image/share.png';
import Heart from '../../Image/like.png';
import NotLike from '../../Image/notlike.png';
import ComentBox from '../ComentBox/ComentBox';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { likePost } from '../../Api/postRequest';
const Post = ({ data, allpost }) => {
  // console.log(allpost,'ttttttttttt');
  //   console.log(data.userId, 'data');
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [comment, setComent] = useState('');

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <div className="details">
        <span>
          <h4>
            {data.userId.firstname} {data.userId.lastname}{' '}
            <br />
            <br />
            <span className="small">{data.desc}</span>{' '}
          </h4>
        </span>
        {/* <span>{data.desc}</span> */}
      </div>
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''} />

      <div className="postReact">
        <div>{data.firstname}</div>
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" onClick={() => setComent(!comment)} />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>

      <div>{comment && <ComentBox postid={data._id} allposts={allpost} />}</div>
    </div>
  );
};

export default Post;
