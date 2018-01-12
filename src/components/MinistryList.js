import React from 'react';
import { connect } from 'react-redux';
import MinistryListItem from './MinistryListItem';

const MinistryList = (props) => (
    <div>
        <div className="list-header">
            <div className="show-for-mobile">Ministry List</div>
            <div className="show-for-desktop">Ministry List</div>
        </div>
        {props.ministries.map((ministry) => {
            return <MinistryListItem key={ministry.id} {...ministry} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        ministries: state.ministries
    };
};

export default connect(mapStateToProps)(MinistryList);