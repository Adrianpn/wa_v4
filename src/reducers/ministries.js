const ministriesReducerDefaultState = [];

export default (state = ministriesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_MINISTRY':
            return [
                ...state,
                action.ministry
            ];
        case 'REMOVE_MINISTRY':
            return state.filter(({ id }) => id !== action.id );
        case 'EDIT_MINISTRY':
            return state.map((ministry) => {
                if (ministry.id === action.id) {
                    return {
                        ...ministry,
                        ...action.updates
                    };
                } else {
                    return ministry;
                };
            });
        case 'SET_MINISTRIES':
            return action.ministries;
        default:
            return state;
    }
};