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
                    songYoutube = '',
                    songKey = '',
                    songId = uid,
                    songName = mid
                } = songData;

        const song = { songArtist, songId, songName, songYoutube, songKey, songTempo }

        return database.ref(`services`).push(service).then((ref) => {
            dispatch(addService({
                id: ref.key,
                ...service
            }));
        });
    };
};

// REMOVE_SERVICE
export const removeService = ({ id } = {}) => ({
    type: 'REMOVE_SERVICE',
    id
});

export const startRemoveService = ({ id, minId } = {}) => {
    return (dispatch) => {
        //console.log(minId);
        return database.ref(`services/${id}`).remove().then(() => {
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
            //console.log(updates.minId);
            return database.ref(`services/${id}`).update(updates).then(() => {
                dispatch(editService(id, updates));
            });
        //};
    };
};

// SET_SERVICES
export const setServices = (services) => ({
    type: 'SET_SERVICES',
    services
});

export const startSetServices = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`services`).once('value').then((snapshot) => {
            const services = [];

            snapshot.forEach((childSnapshot) => {
                services.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setServices(services));
        });
    };
};