const songsReducerDefaultState = [];

export default (state = songsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SONG':
            return [
                ...state,
                action.song
            ];
        case 'REMOVE_SONG':
            return state.filter(({ id }) => id !== action.id );
        case 'EDIT_SONG':
            return state.map((song) => {
                if (song.id === action.id) {
                    return {
                        ...song,
                        ...action.updates
                    };
                } else {
                    return song;
                };
            });
        case 'SET_SONGS':
            return action.songs;
        default:
            return state;
    }
};