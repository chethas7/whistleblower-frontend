import * as userAPI from '../Api/userRequest';

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPDATING_START' });
  try {
    const { data } = await userAPI.updateUser(id, formData);
    dispatch({ type: 'UPDATING_SUCCESS', data: data });
  } catch (error) {
    dispatch({ type: 'UPDATING_FAIL' });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'FOLLOW_USER' });
  userAPI.followUSer(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: 'UNFOLLOW_USER' });
    userAPI.unfollowUSer(id, data);
  };
  