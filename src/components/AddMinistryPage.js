import React from 'react';
import { connect } from 'react-redux';
import MinistryForm from './MinistryForm';
import { startAddMinistry } from '../actions/ministries';
import MinistryList from './MinistryList';

const AddMinistryPage = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Add Ministry</div>
      <div className="show-for-desktop">Add Ministry</div>
    </div>
    <MinistryForm onSubmit={(ministry) => {
      props.dispatch(startAddMinistry(ministry));
        // props.history.push('/create_ministry');
      }}
    />
    <br />
    <MinistryList />
  </div>
);

export default connect()(AddMinistryPage) ;
