import * as PostApi from'../Api/postRequest'

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'RETRIEVING_START' });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: 'RETRIEVING_SUCCESSFUL', data: data });
  } catch (error) {
    dispatch({type:"RETREIVING_FAILED"})
    console.log(error);
  }
};
