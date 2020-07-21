import produce from 'immer';

export const initialState = {
    // mainPosts: [{
    //     id: 1,
    //     User: {
    //         id: 1,
    //         name: '서영규',
    //     },
    //     title: '더미 제목',
    //     content: '더미 내용',
    //     img: 'https://images.immediate.co.uk/production/volatile/sites/3/2019/06/ST3-Production-Still-1-f51cc28.jpg?webp=true&quality=90&resize=620%2C413',
    // }],
    mainPosts: [],
    imagePaths: [],
    addPostErrorReason: '',
    isAddingPost: false,
    postAdded: false,
    isLoadingPost: false,
    postLoaded: false,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';



export default ( state = initialState, action ) => {
    return produce ( state, (draft) => {
        switch (action.type) {

            case UPLOAD_IMAGES_REQUEST: {
                break;
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                draft.imagePaths.push(p);
                });
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }
            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                // draft.mainPosts.unshift(dummyPost);
                draft.mainPosts = [action.data, ...state.mainPosts]
                draft.postAdded = true;
                break;
            }
            case ADD_POST_FAILURE: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case LOAD_POST_REQUEST: {
                draft.isLoadingPost = true;
                draft.postLoaded = false;
                draft.addingPostErrorReason = '';
                break;
            }
            case LOAD_POST_SUCCESS: {
                draft.isLoadingPost = false;
                draft.postLoaded = true;
                // draft.mainPosts = [dummyPost, ...state.mainPosts]
                break;
            }
            case LOAD_POST_FAILURE: {
                draft.isLoadingPost = true;
                draft.postLoaded = false;
                draft.addingPostErrorReason = '';
                break;
            }
            default: {
                break;
            }
        }
    });
};