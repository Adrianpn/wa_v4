const ministriesUserAdminReducerDefaultState = [];

export default (state = ministriesUserAdminReducerDefaultState, action) => {
    switch (action.type) {
        case 'SELECT_MINISTRY_USER_AMIN':
            return state.filter(({ id }) => id == action.id);
        case 'SET_MINISTRIES_USER_ADMIN':
            return action.ministriesUserAdmin;
        default:
            return state;
    }
};