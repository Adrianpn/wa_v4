import React from 'react';
import { Link } from 'react-router-dom';



const MinistryAdminListItem = (props, id) => (
    <div>
        <div className="list-item">
            <h2>{props.ministryName}</h2>
            <h3>Type: {props.ministryGenre}</h3>

            <Link to={`/ministries/${props.id}/services/create`}>
                <button>Add Service</button>
            </Link>
            <button>Retire</button>
        </div>
    </div>
);

export default MinistryAdminListItem;