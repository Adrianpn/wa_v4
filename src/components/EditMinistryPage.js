import React from 'react';
import { connect } from 'react-redux';
import MinistryForm from './MinistryForm';
import { startEditMinistry } from '../actions/ministries';

const EditMinistryPage = (props) => {
  return (
    <div>
      <h1>Edit Ministry</h1>
      <MinistryForm
        ministry={props.ministry}
        onSubmit={(ministry) => {
          console.log('updated', ministry);
          props.dispatch(startEditMinistry(props.ministry.id, ministry));
          props.history.push('/ministries/create');
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ministry: state.ministries.find((ministry) => ministry.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditMinistryPage);
