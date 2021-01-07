import { createSlice } from '@reduxjs/toolkit'
import callAPI from 'api/photoApi'

let findIndex = (state, id) => {
    var result = -1;
    state.forEach((element, index) => {
        if (element.id === id) {
            result = index;
        }
    });
    return result
}


const photo = createSlice({
    name: 'photos',
    initialState: [],// đây khai báo ở đây thôi à vâng ok  
    reducers: {

        // fetchPhotosStart: (state, action) => {
        //     state.loading = true
        // },
        fetchPhotoSuccess: (state, action) => {
            state = action.payload
            return [...state]
        },

        addPhoto: (state, action) => {
            let newstate = [...state]
            newstate.push(action.payload)
            return [...newstate]
        },
        removePhoto: (state, action) => {
            let newstate = [...state]
            console.log(action.payload)
            let index = findIndex(newstate, action.payload)
            console.log(index)
            if (index !== -1) {
                newstate.splice(index, 1)
            }
            return [...newstate]

        },
        updatePhoto: (state, action) => {
            let newstate = [...state]
            const photoUpdated = action.payload
            let index = findIndex(newstate, action.payload.id)
            if (index !== -1) {
                newstate[index] = photoUpdated
            }
            return [...newstate]
        }
    },

})

export const {
    fetchPhotosStart,
    fetchPhotoSuccess,
    fetchPhotoFailure,
    addPhoto,
    removePhoto,
    updatePhoto
} = photo.actions

export default photo.reducer

export const fetchPhotos = () => async dispatch => {
    // try {
    // dispatch(fetchPhotosStart())
    const { data } = await callAPI('products', 'GET', null)
    dispatch(fetchPhotoSuccess(data))
    // } catch (error) {
    //     console.log(error);
    //     dispatch(fetchPhotoFailure(error))
    // }
}

export const actDelete = (id) => async dispatch => {
    console.log(id)
    const res = await callAPI(`products/${id}`, 'DELETE', null)
    dispatch(removePhoto(id))
}

export const actAdd = (product) => async (dispatch) => {
    console.log(product)
    console.log('hello')
    const res = await callAPI('products', 'POST', product)
    dispatch(addPhoto(res.data))
}

export const actUpdate = (data) => async (dispatch) => {
    const res = await callAPI(`products/${data.id}`, 'PUT', data)
    dispatch(updatePhoto(res.data))
}