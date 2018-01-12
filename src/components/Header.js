import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>WoAngel</h1>
        </Link>
        <nav>
          <ul>
            {/* <li></li> */}
            <li>
              <NavLink to="/ministries" activeClassName="is-active">Ministry Dashboard</NavLink>
              <div>
                <ul>
                  <li><NavLink to="/ministries/create" activeClassName="is-active">Create Ministry</NavLink></li>
                  <li><NavLink to="/dashboard" activeClassName="is-active">Service Dashboard</NavLink></li>
                </ul>
              </div>
            </li>
            <li><NavLink to="/songs/create" activeClassName="is-active">Song Dashboard</NavLink></li>
            {/* <li><NavLink to="/dashboard" activeClassName="is-active">Service Dashboard</NavLink></li> */}
          </ul>
        </nav>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);