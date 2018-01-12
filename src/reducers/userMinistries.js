// User Ministries Reducer

const userMinistriesReducerDefaultState = [];

export default (state = userMinistriesReducerDefaultState, action) => {

    switch (action.type) {
        case 'ADD_USER_MINISTRY':
            return [
                ...state,
                action.userMinistry
            ];
        case 'REMOVE_USER_MINISTRY':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_USER_MINISTRY':
            return state.map((userMinistry) => {
                if (userMinistry.id === action.id) {
                    return {
                        ...userMinistry,
                        ...action.updates
                    };
                } else {
                    return userMinistry;
                };
            });
        case 'SET_USER_MINISTRIES':
            return action.userMinistries;
        default:
            return state;
    }
};