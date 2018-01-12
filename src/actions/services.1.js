import database from '../firebase/firebase';

// ADD_SERVICE
export const addService = (service) => ({
    type: 'ADD_SERVICE',
    service
});

export const startAddService = (serviceData = {}, songData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const mid = serviceData.ministryId;
        const   {
                    serviceDate = 0,
                    createdBy = uid,
                    ministryId = mid,
                    songList = [],
                    createdAt = 0
                } = serviceData;
        const service = { serviceDate, createdBy, ministryId, songList, createdAt };

        const   {
                    songArtist = '',
                    songTempo = '',
                    songKey = '',
                    songId = uid,
                    songName = mid
                } = songData;

        const song = { songArtist, songId, songName, songKey, songTempo }

        return [
            database.ref(`services/${ministryId}`).push({
                serviceDate, 
                createdBy, 
                ministryId, 
                createdAt   //don't add SongList here, will make duplicate of array not object
                }).then((ref) => {

                const songList2 = [];
                service.songList.forEach((value, index) => 
                    database.ref(`services/${ministryId}/${ref.key}`).child('songList').push(value)
                        .then((ref) => {
                            songList2.push({ id: ref.key, ...value });
                        })
                    );
                
                
                service.songList = songList2;
                    console.log(songList2);
                dispatch(addService({ id: ref.key, ...service }));
                console.log({ id: ref.key, ...service });

                // database.ref(`users/${uid}/ministriesFeed/${ref.key}`)
                //             .set({ serviceDate, ministryId, id: ref.key });
            })
        ]
    };
};

// REMOVE_SERVICE
export const removeService = ({ id } = {}) => ({
    type: 'REMOVE_SERVICE',
    id
});

export const startRemoveService = ({ id } = {}) => {
    return (dispatch) => {
        //console.log(ministryId);
        return database.ref(`services/-Kz78HoLP9lYljSLz0-o/${id}`).remove().then(() => {
            dispatch(removeService({ id }));
        });
    };
};

// EDIT_SERVICE
export const editService = (id, updates) => ({
    type: 'EDIT_SERVICE',
    id,
    updates
});

export const startEditService = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const services = [];

        return database.ref(`services/-Kz78HoLP9lYljSLz0-o/${id}`).update({
            serviceDate: updates.serviceDate
        }).then(() => {
            const songList2 = [];
            updates.songList.forEach((value, index) => {
                console.log(value);
                if (updates.songList[index].id === undefined) {
                    database.ref(`services/-Kz78HoLP9lYljSLz0-o/${id}/`).child('songList')
                        .push(updates.songList[index])
                        //.push({ songId, songArtist, songKey, songName, songTempo })
                            .then((ref) => {
                                songList2.push({ id: ref.key, ...value });
                        });
                } else
                {
                    database.ref(`services/-Kz78HoLP9lYljSLz0-o/${id}/songList`).child(`${updates.songList[index].id}`)
                        .update(updates.songList[index])
                            .then(() => { 
                                songList2.push({ id, ...value });
                                console.log(value);
                            });
                }
            });
            updates.songList = songList2;
            console.log(updates);

            dispatch(editService(id, updates));

            // database.ref(`users/${uid}/ministriesFeed/${id}`).update({ serviceDate: updates.serviceDate });
        });
    };
};

// SET_SERVICES
export const setServices = (services) => ({
    type: 'SET_SERVICES',
    services
});

export const startSetServices = () => {
    return (dispatch) => {
        return database.ref(`services/-Kz78HoLP9lYljSLz0-o`).once('value').then((snapshot) => {
            const services = [];


            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().songList){
                    const songs = [];
                    Object.entries(childSnapshot.val().songList).forEach(([key, value]) => {
                        songs.push({
                            id: key,
                            ...value
                        });
                    });
                    
                    services.push({
                        id: childSnapshot.key,
                        createdAt: childSnapshot.val().createdAt,
                        createdBy: childSnapshot.val().createdBy,
                        ministryId: childSnapshot.val().ministryId,
                        serviceDate: childSnapshot.val().serviceDate,
                        songList: songs
                    });
                } else {
                    services.push({
                        id: childSnapshot.key,
                        createdAt: childSnapshot.val().createdAt,
                        createdBy: childSnapshot.val().createdBy,
                        ministryId: childSnapshot.val().ministryId,
                        serviceDate: childSnapshot.val().serviceDate
                    });
                };
            });
            console.log(services);
            dispatch(setServices(services));
        })
    };
};