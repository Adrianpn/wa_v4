import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import ministriesReducer from '../reducers/ministries';
import ministriesUserAdminReducer from '../reducers/ministriesUserAdmin';
import songsReducer from '../reducers/songs';
import servicesReducer from '../reducers/services';
import ministriesFeedReducer from '../reducers/ministriesFeed';
import userMinistriesReducer from '../reducers/userMinistries';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      ministries: ministriesReducer,
      ministriesUserAdmin: ministriesUserAdminReducer,
      songs: songsReducer,
      services: servicesReducer,
      ministriesFeed: ministriesFeedReducer,
      userMinistries: userMinistriesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import authReducer from '../reducers/auth';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () => {
//   const store = createStore(
//     combineReducers({
//       auth: authReducer
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   );

//   return store;
// };
