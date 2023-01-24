import React, { useState } from 'react'
import ComentBox from './ComentBox';
const CommentShow = () => {

    const [newMessage,setnewMessage] = useState([]);

    const showCommetns = async (postid) => {
      const response = await showCommetn(postid);
      console.log(response.data, 'response');
      setnewMessage(response.data);
    };
    console.log(newMessage, 'newmseesage');
    useEffect(() => {
      showCommetns(postid);
    }, []);

 
  return (
   <>
    <div> {newMessage?.findcomments?.comments?.map((comment) => {
        return <ComentBox CommentData={comment} />;
      })}</div>
   </>
  )
}

export default CommentShow