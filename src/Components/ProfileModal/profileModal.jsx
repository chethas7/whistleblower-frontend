import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImg } from '../../Actions/uploadAction';
import { updateUser } from '../../Actions/userAction';
// import { uploadImage } from '../../Api/uploadRequest';

function ProfileModal({ modalOpen, setmodalOpen, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData1, setFormData] = useState(other);
  console.log(formData1,"form data");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handeChange = (e) => {
    setFormData({ ...formData1, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === 'profileImage' ? setProfileImage(img) : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData1;
    console.log(userData,'userdata');
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);
      userData.profilePicture = fileName;
      try {
        console.log(data);
        dispatch(uploadImg(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);
      userData.coverPicture = fileName;
      try {
        console.log(data);
        dispatch(uploadImg(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, userData));
    setmodalOpen(false);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpen}
      onClose={() => setmodalOpen(false)}>
      <form className="infoForm">
        <h3>Your Info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname" required
            placeholder="First Name"
            onChange={handeChange}
            value={formData1.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname" required
            placeholder="Last Name"
            onChange={handeChange}
            value={formData1.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handeChange}
            value={formData1.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives In"
            onChange={handeChange}
            value={formData1.livesIn}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handeChange}
            value={formData1.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handeChange}
            value={formData1.relationship}
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button className="button infoButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
