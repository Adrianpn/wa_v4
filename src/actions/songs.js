import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_SONG
export const addSong = 
        ({  songName = '', 
            songArtist = '',
            songYoutube = '', 
            songKey = '',
            songTempo = '',
            userId = '', 
            updatedAt = 0 
        } = {}) => ({
    type: 'ADD_SONG',
    song: {
        id: uuid(),
        songName,
        songArtist,
        songYoutube,
        songKey,
        songTempo,
        userId,
        updatedAt
    }
});

export const startAddSong = (songData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            songName = '',
            songArtist = '',
            songYoutube = '',
            songKey = '',
            songTempo = '',
            userId = uid,
            updatedAt = 0
    } = songData;
        const song = { songName, songArtist, songYoutube, songTempo, songKey, userId, updatedAt };

        return database.ref('songs').push(song).then((ref) => {
            dispatch(addSong({
                id: ref.key,
                ...song
            }));
        });
    };
};

// REMOVE_SONG
export const removeSong = ({ id } = {}) => ({
    type: 'REMOVE_SONG',
    id
});

export const startRemoveSong = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`songs/${id}`).remove().then(() => {
            dispatch(removeSong({ id }));
        });
    };
};

// EDIT_SONG
export const editSong = (id, updates) => ({
    type: 'EDIT_SONG',
    id,
    updates
});

export const startEditSong = (id, updates) => {
    return (dispatch) => {
        return database.ref(`songs/${id}`).update(updates).then(() => {
            dispatch(editSong(id, updates));
        });
    };
};

// SET_SONGS
export const setSongs = (songs) => ({
    type: 'SET_SONGS',
    songs
});

export const startSetSongs = () => {
    return (dispatch) => {
        return database.ref('songs').once('value').then((snapshot) => {
            const songs = [];

            snapshot.forEach((childSnapshot) => {
                songs.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setSongs(songs));
        });
    };
};