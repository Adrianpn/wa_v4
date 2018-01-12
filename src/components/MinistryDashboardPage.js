import React from 'react';
import MinistryAdminList from './MinistryAdminList';
import MinistryList from './MinistryList';
import UserMinistryList from './UserMinistryList';

const MinistryDashboardPage = () => (
    <div className="content-container">
        <div>
            <h1 className="show-for-mobile">Ministry Dashboard</h1>
            <h1 className="show-for-desktop">Ministry Dashboard</h1>
        </div>
        <MinistryList/>
        <br/>
        <UserMinistryList/>
        <MinistryAdminList/>
    </div>
);

export default MinistryDashboardPage;