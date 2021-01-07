import Banner from '../../../../components/Banner';
import PhotoForm from '../../components/PhotoForm';
import React from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updatePhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from 'features/Photo/photoSlice';
import { actAdd } from 'features/Photo/photoSlice';

AddEditPage.propTypes = {};


function AddEditPage(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { photoId } = useParams()
  const isAddMode = !photoId
  const editPhoto = useSelector(state =>
    state.photos.find(x => x.id === +photoId))//đang ở dạng string

  const initialValues = isAddMode ?
    {
      title: '',
      categoryId: null,
      photo: ''
    } : editPhoto

  const handleSubmit = (values) => {
    // const product = { values }
    // console.log('Form submit', product);
    console.log(values)
    if (isAddMode) {
      const action = actAdd(values)
      console.log({ action });
      dispatch(action)
      history.push('/photos')
      // actAdd(values)


    } else {
      const action = updatePhoto(values)
      dispatch(action)
      history.push('/photos')

    }
  }

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;