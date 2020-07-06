import produce from 'immer';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            name: '서영규',
        },
        title: '더미 제목',
        content: '더미 내용',
        img: 'https://images.immediate.co.uk/production/volatile/sites/3/2019/06/ST3-Production-Still-1-f51cc28.jpg?webp=true&quality=90&resize=620%2C413',
    }],
    // mainPosts: [],
    addPostErrorReason: '',
    isAddingPost: false,
    postAdded: false,
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


const dummyPost = {
    id: 2,
    User: {
      id: 1,
      name: '서영규',
    },
    title: '더미 제목',
    content: '더미 내용',
}


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
                // draft.mainPosts.unshift(dummyPost);
                draft.mainPosts = [dummyPost, ...state.mainPosts]
                draft.postAdded = true;
                break;
            }
            case ADD_POST_FAILURE: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            default: {
                break;
            }
        }
    });
};