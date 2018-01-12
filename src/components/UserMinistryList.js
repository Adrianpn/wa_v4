import React from 'react';
import { connect } from 'react-redux';
import UserMinistryListItem from './UserMinistryListItem';

const UserMinistryList = (props) => (
    <div>
        <div className="list-header">
            <div className="show-for-mobile">My Ministry List</div>
            <div className="show-for-desktop">My Ministry List</div>
        </div>
        {props.userMinistries.map((userMinistry) => {
            return <UserMinistryListItem key={userMinistry.id} {...userMinistry} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        userMinistries: state.userMinistries
    }; 
};

export default connect(mapStateToProps)(UserMinistryList);