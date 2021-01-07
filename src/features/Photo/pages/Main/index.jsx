import Banner from 'components/Banner';
import Images from 'constants/images';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PhotoList from 'features/Photo/components/PhotoList'
import { removePhoto } from 'features/Photo/photoSlice';
MainPage.propTypes = {};

function MainPage(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const photos = useSelector(state => state.photos)
  // console.log('List', photos);

  const handlePhotoEditClick = (photo) => {
    console.log('Edit', photo);
    const editPhotoUrl = `/photos/${photo.id}`
    history.push(editPhotoUrl)
  }

  const handlePhotoRemoveClick = (photo) => {
    // console.log('Remove', photo);
    const removePhotoId = photo.id
    const action = removePhoto(removePhotoId)
    dispatch(action)
  }
  return (
    <div className="photo-main">
      <Banner title="Your awesome photos " backgroundUrl={Images.PINK_BG} />

      <div className=" py-3 text-center">
        <Link to="/photos/add" >
          Add new photo
        </Link>
      </div>

      <PhotoList
        photoList={photos}
        onPhotoEditClick={handlePhotoEditClick}
        onPhotoRemoveClick={handlePhotoRemoveClick}
      />

    </div>
  );
}

export default MainPage;