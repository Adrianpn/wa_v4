import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { startRemoveMinistry } from '../actions/ministries';
import { startAddUserMinistry, startRemoveUserMinistry } from '../actions/userMinistries';

const MinistryListItem = ({ dispatch, id, minKey, ministryName, ministryGenre, createdAt }) => (
    <div className="list-item">
        <div>
            <Link to={`/ministries/edit/${id}`}>
                <h3>{ministryName}</h3>
            </Link>
        </div>
        <div>
            <h3>{ministryGenre}</h3>
        </div>
        <p>Created - {moment(createdAt).format('dddd, MMMM Do YYYY, h A')}</p>
        {/* <button onClick={() => {
            //dispatch(startRemoveMinistry({ id, minKey }));
            //props.history.push('/');
        }}>Follow</button> */}
        <button onClick={() => {
            dispatch(startAddUserMinistry({ id, ministryName, ministryGenre }));
            //props.history.push('/');
        }}>Join</button>
        <button onClick={() => {
            dispatch(startRemoveUserMinistry({ id }));
            //dispatch(startRemoveMinistry({ id, minKey })); --> Should be admin rights only button, deletes ministry totally
            //props.history.push('/');
        }}>Remove</button>
   </div>
);

export default connect()(MinistryListItem);