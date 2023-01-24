import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModal/profileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as userAPI from '../../Api/userRequest.js';
import { logout } from '../../Actions/authAction';
import axios from 'axios';

const InfoCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpen, setmodalOpen] = useState(false);
  const profileUserID = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const { id } = useParams();
  // console.log(id, '--------search user id222222222');
  const [nameSearch, setNameSearch] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const fetchFollowers = async () => {
    if (id) {
      // console.log(' dddddddddddddddd22222');
      const { data } = await axios.get(`/user/${id}`);
      // console.log(data, '-----------datasett2222222222222222');
      setNameSearch(data);
      setRefresh(true);
      console.log(nameSearch, 'namesearched2222222');
    }
  };
  const handleMessage = async (id) => {
    const response = await userAPI.getMessage(id, user._id);
    navigate('/chat');
  };
  useEffect(() => {
    fetchFollowers();
  }, [refresh]);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserID === user._id) {
        setProfileUser(user);
        // console.log(user);
      } else {
        // console.log('fetching...!');
        const profileUser = await userAPI.getUser(profileUserID);
        setProfileUser(profileUser);
        // console.log("profileuser",profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserID ? (
          <div>
            <UilPen width="2rem" height="1.2rem" onClick={() => setmodalOpen(true)} />
            <ProfileModal modalOpen={modalOpen} setmodalOpen={setmodalOpen} data={user} />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        {!nameSearch ? (
          <span> {profileUser.relationship}</span>
        ) : (
          <span> {nameSearch.relationship}</span>
        )}
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>

        {!nameSearch ? <span> {profileUser.livesIn}</span> : <span> {nameSearch.livesIn}</span>}
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        {!nameSearch ? <span> {profileUser.worksAt}</span> : <span> {nameSearch.worksAt}</span>}
      </div>

      {(user._id ===id) ? (
        <button className="button logOut-Button" onClick={handleLogOut}>
          Logout
        </button>
      ) :
    (  <button
          className="button logOut-Button"
          onClick={() => {
            handleMessage(nameSearch._id);
          }}>
          Message
        </button>)
      //  nameSearch ? (
      //   <button
      //     className="button logOut-Button"
      //     onClick={() => {
      //       handleMessage(nameSearch._id);
      //     }}>
      //     Message
      //   </button>
      // ) : (
      //   ''
      // )
      }

      {/* <button className="button logOut-Button" onClick={handleLogOut}>
        Logout
      </button> */}
    </div>
  );
};

export default InfoCard;
