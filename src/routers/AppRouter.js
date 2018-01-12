import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MinistryDashboardPage from '../components/MinistryDashboardPage';
import ServiceDashboardPage from '../components/ServiceDashboardPage';
import AddMinistryPage from '../components/AddMinistryPage';
import AddSongPage from '../components/AddSongPage';
import EditSongPage from '../components/EditSongPage';
import AddServicePage from '../components/AddServicePage';
import EditServicePage from '../components/EditServicePage';
import EditMinistryPage from '../components/EditMinistryPage';
import ServiceForm from '../components/ServiceForm';
import ShowServicePage from '../components/ShowServicePage';
import NotFoundPage from '../components/NotFoundPage';
//import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/ministries" component={MinistryDashboardPage} exact={true} />
        <PrivateRoute path="/ministries/create" component={AddMinistryPage} exact={true} />
        <PrivateRoute path="/ministries/edit/:id" component={EditMinistryPage} exact={true} />
        <PrivateRoute path="/ministries/:id/services/create" component={AddServicePage} exact={true} />
        <PrivateRoute path="/songs/create" component={AddSongPage} exact={true} />
        <PrivateRoute path="/songs/edit/:id" component={EditSongPage} exact={true} />
        <PrivateRoute path="/services/create" component={AddServicePage} exact={true} />
        <PrivateRoute path="/service/edit/:id" component={EditServicePage} exact={true} />
        <PrivateRoute path="/service/:id" component={ShowServicePage} exact={true} />
        <PrivateRoute path="/dashboard" component={ServiceDashboardPage} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;



// import React from 'react';
// import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
// import DashboardPage from '../components/DashboardPage';
// import NotFoundPage from '../components/NotFoundPage';
// import LoginPage from '../components/LoginPage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

// export const history = createHistory();

// const AppRouter = () => (
//   <Router history={history}>
//     <div>
//       <Switch>
//         <PublicRoute path="/" component={LoginPage} exact={true} />
//         <PrivateRoute path="/dashboard" component={DashboardPage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     </div>
//   </Router>
// );

// export default AppRouter;
