import { createSlice } from '@reduxjs/toolkit'
import callAPI from 'api/photoApi'
// const initialPhotos = [
//     {
//         id: 91176,
//         categoryId: 5,
//         photo: 'https://picsum.photos/id/532/300/300',
//         title: 'Enim laboris dolore consectetur et fugiat do amet eiusmod anim proident do culpa irure consectetur.'
//     },
//     {
//         id: 82605,
//         categoryId: 1,
//         photo: 'https://picsum.photos/id/43/300/300',
//         title: 'Ad officia magna veniam sunt.'
//     },
//     {
//         id: 74760,
//         categoryId: 3,
//         photo: 'https://picsum.photos/id/722/300/300',
//         title: 'Minim anim in sunt esse nisi sit magna consequat in sit laboris adipisicing.'
//     },
//     {
//         id: 39588,
//         categoryId: 5,
//         photo: 'https://picsum.photos/id/294/300/300',
//         title: 'Deserunt in tempor est id consectetur cupidatat.'
//     },
//     {
//         id: 72133,
//         categoryId: 4,
//         photo: 'https://picsum.photos/id/229/300/300',
//         title: 'Labore culpa velit sunt sit anim ad do veniam do proident sunt et nisi mollit.'
//     },
//     {
//         id: 95333,
//         categoryId: 1,
//         photo: 'https://picsum.photos/id/862/300/300',
//         title: 'Fugiat fugiat voluptate tempor minim ipsum nisi culpa magna officia ea deserunt tempor.'
//     },
//     {
//         id: 62419,
//         categoryId: 3,
//         photo: 'https://picsum.photos/id/515/300/300',
//         title: 'Excepteur nisi aliquip ex aliqua consectetur id laboris cillum elit dolor dolor anim sint.'
//     },
//     {
//         id: 12569,
//         categoryId: 5,
//         photo: 'https://picsum.photos/id/730/300/300',
//         title: 'Occaecat exercitation Lorem cupidatat adipisicing elit duis consequat esse et tempor eu enim cupidatat.'
//     },
//     {
//         id: 47434,
//         categoryId: 3,
//         photo: 'https://picsum.photos/id/287/300/300',
//         title: 'Veniam officia est nulla proident labore.'
//     },
//     {
//         id: 52685,
//         categoryId: 3,
//         photo: 'https://picsum.photos/id/859/300/300',
//         title: 'Ut incididunt do magna culpa consectetur id deserunt et enim elit quis.'
//     },
//     {
//         id: 69928,
//         categoryId: 5,
//         photo: 'https://picsum.photos/id/110/300/300',
//         title: 'Nisi velit fugiat voluptate fugiat magna officia qui fugiat ad non.'
//     },
//     {
//         id: 86160,
//         categoryId: 5,
//         photo: 'https://picsum.photos/id/649/300/300',
//         title: 'Id ex enim non dolore reprehenderit eu ullamco.'
//     },
// ];

// export const getPhotos = createAsyncThunk(
//     'photos/getPhotos',
//     async () => {
//         const currentPhoto = await photoApi.getAll()
//         console.log(currentPhoto);
//         return currentPhoto
//     })

// const initialState = { // chỗ này ko cần khai báo à em 
//     loading: false,// đợi e bỏ
//     err: '',
//     photos: []
// }




const photo = createSlice({
    name: 'photos',
    initialState: [],// đây khai báo ở đây thôi à vâng ok  
    reducers: {

        // fetchPhotosStart: (state, action) => {
        //     state.loading = true
        // },
        fetchPhotoSuccess: (state, action) => {
            // console.log(action.payload)
            state = action.payload
            // console.log(state)
            return [...state]
        },
        // fetchPhotoFailure: (state, action) => {
        //     state.err = action.payload
        //     state.loading = false
        // },
        addPhoto: (state, action) => {
            let newstate = [...state]
            newstate.push(action.payload)
            return [...newstate]
        },
        removePhoto: (state, action) => {
            const removePhotoId = action.payload
            state.filter(photo => photo.id !== removePhotoId)
        },
        updatePhoto: (state, action) => {
            const newPhoto = action.payload
            const photoIndex = state.findIndex(photo => photo.id = newPhoto.id)
            if (photoIndex >= 0) {
                state[photoIndex] = newPhoto
            }
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

// export const actDelete = (id) => async dispatch => {
//     await photoApi.delete(id)
//     dispatch(removePhoto(id))
// }

export const actAdd = (product) => async (dispatch) => {
    console.log(product)
    console.log('hello')
    const res = await callAPI('products', 'POST', product)
    dispatch(addPhoto(res.data))
}