import database from '../firebase/firebase';

// ADD_USER_MINISTRY
export const addUserMinistry = (userMinistry) => ({
    type: 'ADD_USER_MINISTRY',
    userMinistry
});

export const startAddUserMinistry = (userMinistryData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            id = '',
            ministryName = '',
            ministryGenre = ''
        } = userMinistryData;

        const userMinistry = { ministryName, ministryGenre };

        return database.ref(`users/${uid}/userMinistries/${id}`).set(userMinistry).then((ref) => {
            dispatch(addUserMinistry({
                id,
                ...userMinistry
            }));
        });
    };
};

// REMOVE_USER_MINISTRY
export const removeUserMinistry = ({ id } = {}) => ({
    type: 'REMOVE_USER_MINISTRY',
    id
});

export const startRemoveUserMinistry = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/userMinistries/${id}`).remove().then(() => {
            dispatch(removeUserMinistry({ id }));
        });
    };
};

// EDIT_USER_MINISTRY
export const editUserMinistry = (id, updates) => ({
    type: 'EDIT_USER_MINISTRY',
    id,
    updates
});

export const startEditUserMinistry = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/userMinistries/${id}`).update(updates).then(() => {
            dispatch(editUserMinistry(id, updates));
        });
    };
};

// SET_USER_MINISTRIES
export const setUserMinistries = (userMinistries) => ({
    type: 'SET_USER_MINISTRIES',
    userMinistries
});

export const startSetUserMinistries = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/userMinistries`).once('value').then((snapshot) => {
            const userMinistries = [];

            snapshot.forEach((childSnapshot) => {
                userMinistries.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setUserMinistries(userMinistries));
        });
    };
};




// export const setUserMinistries = (userMinistries) => ({
//     type: 'SET_USER_MINISTRIES',
//     userMinistries
// });

// export const startSetUserMinistries = () => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         return database.ref(`users/${uid}/userMinistries`).once('value').then((snapshot) => {
//             const userMinistries = [];

//             snapshot.forEach((childSnapshot) => {
//                 userMinistries.push({
//                     id: childSnapshot.key,
//                     ...childSnapshot.val()
//                 });
//             });
//             dispatch(setUserMinistries(userMinistries));
//         });
//     };
// };