import React from 'react';
import { connect } from 'react-redux';
import ServiceForm from './ServiceForm';
import { startEditService, startRemoveService } from '../actions/services';
import { editMinistryFeed, startRemoveMinistryFeed, startEditMinistryFeed } from '../actions/ministriesFeed';

export class EditServicePage extends React.Component {
  onSubmit = (service) => {
    service.minId = this.props.service.ministryId;
    this.props.startEditService(this.props.service.id, service);
    //this.props.editMinistryFeed(this.props.service.id, service);
    //this.props.startEditMinistryFeed(this.props.service.id, service);
    
    this.props.history.push('/');
  };
  onRemove = () => {
    const minId = this.props.service.ministryId;
    this.props.startRemoveService({ id: this.props.service.id, minId });
    //this.props.startRemoveMinistryFeed({ id: this.props.service.id });
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div className="content-container">
        <h1 className="list-header">Edit Service</h1>
          <ServiceForm
            service={this.props.service}
            onSubmit={this.onSubmit}
          />
          <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  service: state.services.find((service) => service.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditService: (id, service) => dispatch(startEditService(id, service)),
  //editMinistryFeed: (id, service) => dispatch(editMinistryFeed(id, service)),
  startRemoveService: (data) => dispatch(startRemoveService(data))
  //startRemoveMinistryFeed: (data) => dispatch(startRemoveMinistryFeed(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditServicePage);