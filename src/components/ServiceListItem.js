import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ServiceListItem = ({ id, serviceDate, songList }) => (
   <div>
        <Link to={`/edit_service/${id}`}>
            <h3>{moment(serviceDate).format("dddd, MMMM Do YYYY")}</h3>
        </Link>
        <p>{songList}</p>
   </div>
);

export default ServiceListItem;