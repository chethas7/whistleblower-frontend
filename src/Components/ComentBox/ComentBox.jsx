import React, { useState } from 'react';
import { useFormik } from 'formik';
import './comentBox.css';
import * as Yup from 'yup';
import { commentPost, showCommetn } from '../../Api/postRequest';
import { useEffect } from 'react';
import CommentShow from './CommentShow';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const ComentBox = ({ postid, allposts }) => {
  const [newMessage, setnewMessage] = useState('');

  const [data, setData] = useState({
    comment: ''
  });

  const envData = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);
  // console.log(user, 'asdfghjklqwertyuiop');
  const userId = user._id;

  const showCommetns = async (postid) => {
    const response = await showCommetn(postid);
    console.log(response.data, 'response');
    setnewMessage(response.data);
  };
  console.log(newMessage, 'newmseesage');
  useEffect(() => {
    showCommetns(postid);
  }, []);
  const validationSchema = Yup.object({
    comment: Yup.string().required('Please enter something')
  });
  const resetFrom = () => {
    setData({ comment: '' });
  };
  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    onSubmit: async (values) => {
      // commentpost({ values, post });
      // console.log(values);
      const { data } = await commentPost(values, postid, userId);
      if (data) showCommetns(postid);
      allposts();
    },

    validationSchema
  });

  return (
    <div>
      <form className="chat-sender" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
          placeholder="Write a comment"
        />
        <button type="submit" className="button ps-button">
          comment
        </button>
      </form>

      <div>
        <div>
          {' '}
          {newMessage?.findComments?.comments?.map((comment) => {
            return (
              <div>
                <div className="usersInfo">
                  <img
                    src={
                      comment.commentBy.profilePicture
                        ? envData + comment.commentBy.profilePicture
                        : envData + 'profile.png'
                    }
                    alt=""
                    className="commentUserImage"
                  />
                  <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="name">
                      <span>
                        {comment.commentBy.firstname} {comment.commentBy.lastname}
                      </span>
                    </div>
                  </Link>
                  <div className="commentContent">{comment.comment}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComentBox;
