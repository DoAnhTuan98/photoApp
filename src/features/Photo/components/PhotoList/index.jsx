import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import PhotoCard from '../PhotoCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../photoSlice';

PhotoList.propTypes = {
    photoList: PropTypes.array,
    onPhotoEditClick: PropTypes.func,
    onPhotoRemoveClick: PropTypes.func,
};

PhotoList.defaultProps = {
    photoList: [],
    onPhotoEditClick: null,
    onPhotoRemoveClick: null,
};


function PhotoList(props) {
    const { onPhotoEditClick, onPhotoRemoveClick } = props
    const dispatch = useDispatch()
    const photoList = useSelector(state => state.photos)// chỗ này này h làm gì con state.photos nữa nhỉ
    console.log(photoList);
    useEffect(() => {
        dispatch(fetchPhotos())
    }, [dispatch])

    return (
        <Row>
            {photoList.map(photo => (// fetch qua map
                <Col key={photo.categoryId} xs='12' md='6' lg='3' >
                    <PhotoCard
                        photo={photo}
                        onRemoveClick={onPhotoRemoveClick}
                        onEditClick={onPhotoEditClick}
                    />
                </Col>
            )
            )}
        </Row>
    )
}

export default PhotoList
