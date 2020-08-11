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
    mainPostsAll: [],
    singlePost: null,
    postDeleted: false,
    imagePaths: [],
    addPostErrorReason: '',
    isAddingPost: false,
    postAdded: false,
    postLoaded: false,
    
    // pagination
    start: 0,
    end: 10,
    current: 1,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_SINGLE_POST_REQUEST = 'LOAD_SINGLE_POST_REQUEST';
export const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS';
export const LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const POST_RESET_DONE = 'POST_RESET_DONE';
export const POST_DELETE_DONE = 'POST_DELETE_DONE';

export const CURRENT_PAGE_NUMBER = 'CURRENT_PAGE_NUMBER';
export const CURRENT_PAGE_NUMBER_SUCCESS = 'CURRENT_PAGE_NUMBER_SUCCESS';
export const CURRENT_PAGE_NUMBER_FAILURE = 'CURRENT_PAGE_NUMBER_FAILURE';
export const UPDATE_START_END_PAGE = 'UPDATE_START_END_PAGE';
export const GO_TO_BEGIN = 'GO_TO_BEGIN';


export default ( state = initialState, action ) => {
    return produce ( state, (draft) => {
        switch (action.type) {


            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
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
            case REMOVE_POST_REQUEST: {
                break;
            }
            case REMOVE_POST_SUCCESS: {
                const index = draft.mainPosts.findIndex(v => v.id === action.data);
                draft.mainPosts.splice(index, 1);
                draft.postDeleted = true;
                break;
            }
            case REMOVE_POST_FAILURE: {
                break;
            }
            case POST_RESET_DONE: {
                draft.imagePaths = [];
            }
            case POST_DELETE_DONE: {
                draft.postDeleted = false;
                break;
            }
            case LOAD_MAIN_POSTS_REQUEST: {
                draft.mainPosts = [];
                // draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.postAdded = false;
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS: {
                // action.data.forEach((d) => {
                //     draft.mainPosts.push(d);
                // });
                draft.mainPosts = action.data.posts;
                draft.mainPostsAll = action.data.postsAll.length;
                break;
            }
            case LOAD_MAIN_POSTS_FAILURE: {
                break;
            }
            case LOAD_SINGLE_POST_REQUEST: {
                break;
            }
            case LOAD_SINGLE_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }
            case LOAD_SINGLE_POST_FAILURE: {
                break;
            }


            case UPDATE_START_END_PAGE: {
                draft.start = action.payload.start;
                draft.end = action.payload.end;
                // draft.current = action.payload.start;
                break;
            }
            case CURRENT_PAGE_NUMBER: {
                draft.current = action.payload;
                break;
            }

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
            case REMOVE_IMAGE: {
                const index = draft.imagePaths.findIndex((v, i) => i === action.index);
                draft.imagePaths.splice(index, 1);
                break;
            }
            default: {
                break;
            }
        }
    });
};