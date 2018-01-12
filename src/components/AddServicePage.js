import React from 'react';
import { connect } from 'react-redux';
import ServiceForm from './ServiceForm';
import { addService, startAddService } from '../actions/services';
import { startAddMinistryFeed, startSetMinistriesFeed } from '../actions/ministriesFeed';
import ServiceList from './ServiceList';

export class AddServicePage extends React.Component {

  onSubmit = (service) => {
    console.log(service);
    service.ministryId = this.props.match.params.id;
    this.props.startAddService(service);
    //this.props.startSetMinistriesFeed();
    //this.props.startAddMinistryFeed();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="content-container">
        <h1>Add Service</h1>
        <ServiceForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddService: (service) => dispatch(startAddService(service)),
  startAddMinistryFeed: (service) => dispatch(startAddMinistryFeed(service))
});

export default connect(undefined, mapDispatchToProps)(AddServicePage);
