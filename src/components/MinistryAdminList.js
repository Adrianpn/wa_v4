import React from 'react';
import { connect } from 'react-redux';
import MinistryAdminListItem from './MinistryAdminListItem';
import { selectMinistry } from '../actions/ministriesUserAdmin';

export class MinistryAdminList extends React.Component {
    onSubmit = (ministry) => {
        this.props.selectMinistry(ministry);
        // this.props.history.push('/');
        console.log(ministry);
        console.log(this.props.ministriesUserAdmin);
    };
    render() {
        return (
            <div><br/>
                <div className="list-header">
                    <div className="show-for-mobile">Ministry Admin List</div>
                    <div className="show-for-desktop">Ministry Admin List</div>
                </div>
                {this.props.ministriesUserAdmin.map((ministry) => {
                    return <MinistryAdminListItem 
                                key={ministry.id} 
                                {...ministry} 
                                onSubmit={this.onSubmit} 
                            />
                })}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ministriesUserAdmin: state.ministriesUserAdmin
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    selectMinistry: (ministry) => dispatch(selectMinistry(ministry))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinistryAdminList);


