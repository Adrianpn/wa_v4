import uuid from 'uuid';
import database from '../firebase/firebase';

// SELECT_MINISTRY
export const selectMinistry = ({ id } = {}) => ({
    type: 'SELECT_MINISTRY_USER_AMIN',
    id
});

// SET_MINISTRIES_USER_ADMIN
export const setMinistriesUserAdmin = (ministriesUserAdmin) => ({
    type: 'SET_MINISTRIES_USER_ADMIN',
    ministriesUserAdmin
});

export const startSetMinistriesUserAdmin = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`usersMinistriesAdmin/${uid}/`).once('value').then((snapshot) => {
            const ministriesUserAdmin = [];

            snapshot.forEach((childSnapshot) => {
                ministriesUserAdmin.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setMinistriesUserAdmin(ministriesUserAdmin));
        });
    };
};