import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../Image/home.png';
import Notification from '../../Image/noti.png';
import Comment from '../../Image/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModel/ShareModal';
import { Link } from 'react-router-dom';
import FollowersCard from '../FollowersCard/FollowersCard';

const RightSide = () => {
  const [modalOpen, setmodalOpen] = useState(false);

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Notification} alt="" />
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
      </div>
      <FollowersCard />

      {/* <TrendCard /> */}
     
      <ShareModal modalOpen={modalOpen} setmodalOpen={setmodalOpen} />
    </div>
  );
};

export default RightSide;
