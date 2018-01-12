import uuid from 'uuid';
import database from '../firebase/firebase';

export const addMinistriesFeed = (ministryFeed) => ({
    type: 'ADD_MINISTRY_FEED',
    ministryFeed
});


export const startAddMinistryFeed = (serviceData = {}, songData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const mid = serviceData.ministryId;
        const slist = ['songs'];
        const {
                    serviceDate = 0,
                    createdBy = uid,
                    ministryId = mid,
                    songList = slist,
                    createdAt = 0
                } = serviceData;
        const ministryFeed = { serviceDate, createdBy, ministryId, songList, createdAt };

        const {
                songArtist = 0,
                songId = uid,
                songName = mid
            } = songData;

        const song = { songArtist, songId, songName }

        return [
            database.ref('services').push({
                serviceDate, createdBy, ministryId, createdAt
            }).then((ref) => {
                dispatch(addMinistriesFeed({
                    id: ref.key,
                    ...ministryFeed
                }));

                // let i;

                // for (i = 0; i < ministryFeed.songList.length; i++) {
                //     database.ref(`services/${ref.key}`).child('songList').push(ministryFeed.songList[i]);
                // };
                database.ref(`users/${uid}/ministriesFeed/${ref.key}`).set({ serviceDate, ministryId });
            })
        ]
    };
};

// REMOVE_MINISTRY_FEED
export const removeMinistryFeed = ({ id } = {}) => ({
    type: 'REMOVE_MINISTRY_FEED',
    id
});

export const startRemoveMinistryFeed = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/ministriesFeed/${id}`).remove().then(() => {
            dispatch(removeMinistryFeed({ id }));
        });
    };
};

// EDIT_MINISTRY_FEED
export const editMinistryFeed = (id, updates) => ({
    type: 'EDIT_MINISTRY_FEED',
    id,
    updates
});

export const startEditMinistryFeed = (id, updates) => {
    console.log(updates);
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/ministriesFeed/${id}`)
            .update(updates).then(() => {
                dispatch(editMinistryFeed(id, updates));
        });
    };
};

// SET_MINISTRIES_FEED
export const setMinistriesFeed = (ministriesFeed) => ({
    type: 'SET_MINISTRIES_FEED',
    ministriesFeed
});

export const startSetMinistriesFeed = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let ministriesFeed = [];

        return database.ref(`users/${uid}/userMinistries/`).once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                database.ref(`services/${childSnapshot.key}`).once("value").then((data) => {
                    data.forEach((data) => {
                        ministriesFeed.push({
                            id: data.key,
                            ...data.val()
                        });
                        console.log(ministriesFeed);
                    });
                });
            });
            setTimeout(() => dispatch(setMinistriesFeed(ministriesFeed)), 2000);
            //dispatch(setMinistriesFeed(ministriesFeed));
        });
    };
};

// export const startSetMinistriesFeed = () => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         let ministriesFeed = [];

//         return database.ref(`users/${uid}/userMinistries/`).once('value').then((snapshot) => {
//             snapshot.forEach((childSnapshot) => {
//                 database.ref(`services/${childSnapshot.key}`).once("value").then((data) => {
//                     data.forEach((data) => {
//                         ministriesFeed.push({
//                             id: data.key,
//                             ...data.val()
//                         });
//                         console.log(ministriesFeed);
//                     });
//                 });
//             });
//             setTimeout(() => dispatch(setMinistriesFeed(ministriesFeed)), 2000);
//             //dispatch(setMinistriesFeed(ministriesFeed));
//         });
//     };
// };

// export const startSetMinistriesFeed = () => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         return database.ref(`services/-L11l9IBaQcrs0hH_P1m`).once('value').then((snapshot) => {
//             const ministriesFeed = [];

//             snapshot.forEach((childSnapshot) => {
//                 ministriesFeed.push({
//                     id: childSnapshot.key,
//                     ...childSnapshot.val()
//                 });
//             });
//             console.log(ministriesFeed);
//             console.log(JSON.parse(JSON.stringify(ministriesFeed)));
//             dispatch(setMinistriesFeed(ministriesFeed));
//         });
//     };
// };