// const ministriesFeedReducerDefaultState = [];

// export default (state = ministriesFeedReducerDefaultState, action) => {
//     switch (action.type) {
//         case 'SELECT_MINISTRY_FEED':
//             return state.filter(({ id }) => id == action.id);
//         case 'SET_MINISTRIES_FEED':
//             return action.ministriesFeed;
//         default:
//             return state;
//     }
// };


const ministriesFeedReducerDefaultState = [];

export default (state = ministriesFeedReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_MINISTRY_FEED':
            return [
                ...state,
                action.ministryFeed
            ];
        case 'REMOVE_MINISTRY_FEED':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_MINISTRY_FEED':
            return state.map((ministryFeed) => {
                if (ministryFeed.id === action.id) {
                    return {
                        ...ministryFeed,
                        ...action.updates
                    };
                } else {
                    return ministryFeed;
                };
            });
        case 'SET_MINISTRIES_FEED':
            return action.ministriesFeed;
        default:
            return state;
    }
};