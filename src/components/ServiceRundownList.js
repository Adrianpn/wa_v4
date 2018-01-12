import React from 'react';
import { connect } from 'react-redux';
import ServiceRundownListItem from './ServiceRundownListItem';
import moment from 'moment';

export const ServiceRundownList = (props) => (
    <div className="card__container">
        {/* <div className="list-header">
            <div className="show-for-mobile">Services</div>
            <div className="show-for-desktop">Ministry Name</div>
            <div className="show-for-desktop">Date</div>
        </div> */}
        <div className="list-body">{console.log(props.service)}
            {
                props.service.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No Services</span>
                    </div>
                ) : (                   
                        //props.service.map((service) => {
                        //    return <ServiceRundownListItem key={service.id} {...service}/>
                        //})

                        props.userMinistry.map((service) => {
                            let serviceFeed = [];
                            serviceFeed = props.service
                                .filter((myService) => myService.ministryId === service.id 
                                            && myService.serviceDate >= moment().valueOf());
                            return serviceFeed.map((service) => {
                                return <ServiceRundownListItem key={service.id} {...service} />
                            });
                        })

                    )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        service: state.services,
        userMinistry: state.userMinistries
    };
};

export default connect(mapStateToProps)(ServiceRundownList);
