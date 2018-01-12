import React from 'react';
import { connect } from 'react-redux';
import ServiceListItem from './ServiceListItem';

export const ServiceList = (props) => (
    <div>
        <h1>Service List</h1>
        {props.services.map((service) => {
            return <ServiceListItem key={service.id} {...service} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        services: state.services
    };
};

export default connect(mapStateToProps)(ServiceList);
