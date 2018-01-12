import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_MINISTRY
export const addMinistry = (ministry) =>({
    type: 'ADD_MINISTRY',
    ministry
});

export const startAddMinistry = (ministryData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
                ministryName = '',
                ministryGenre = '',
                ministryPublic = true,
                createdAt = 0,
                createdBy = uid
            } = ministryData;
        const ministry = { 
                            ministryName, 
                            ministryGenre, 
                            ministryPublic, 
                            createdAt, 
                            createdBy 
                        };

        const ministryAdmin = {
            ministryName, ministryGenre, createdAt
        };

        const minData = database.ref('ministries').push(ministry);

        const minKey = minData.key;

        return [
                minData.then((ref) => {
                    dispatch(addMinistry({
                        id: ref.key,
                        ...ministry
                    }));
                }),
                database.ref(`usersMinistriesAdmin/${uid}/${minKey}`).set(ministryAdmin),
            database.ref(`users/${uid}/userMinistries/${minKey}`).set({ ministryName, ministryGenre })
            ]
    };
};

// REMOVE_MINISTRY
export const removeMinistry = ({ id } = {}) => ({
    type: 'REMOVE_MINISTRY',
    id
});

export const startRemoveMinistry = ({ id, minKey } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return [
                database.ref(`ministries/${id}`).remove().then(() => {
                dispatch(removeMinistry({ id }));
                }),
                database.ref(`usersMinistriesAdmin/${uid}/${id}`).remove(),
            database.ref(`users/${uid}/userMinistries/${id}`).remove()
            ]
    };
};

// EDIT_MINISTRY
export const editMinistry = (id, updates) => ({
    type: 'EDIT_MINISTRY',
    id,
    updates
});

export const startEditMinistry = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return [
            database.ref(`ministries/${id}`).update(updates).then(() => {
                dispatch(editMinistry(id, updates));
            }),
            database.ref(`usersMinistriesAdmin/${uid}/${id}`).update(updates).then(() => {
                dispatch(editMinistry(id, updates));
            })
        ]
    };
};

// SET_MINISTRIES
export const setMinistries = (ministries) => ({
    type: 'SET_MINISTRIES',
    ministries
});

export const startSetMinistries = () => {
    return (dispatch) => {
        return database.ref('ministries').once('value').then((snapshot) => {
            const ministries = [];

            snapshot.forEach((childSnapshot) => {
                ministries.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setMinistries(ministries));
        });
    };
};
