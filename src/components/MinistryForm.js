import React from 'react';
import moment from 'moment';
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

export default class MinistryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ministryName: props.ministry ? props.ministry.ministryName : '',
            ministryGenre: props.ministry ? props.ministry.ministryGenre : '',
            ministryPublic: props.ministry ? props.ministry.ministryPublic : true,
            createdAt: props.ministry ? moment(props.ministry.createdAt) : moment(),
            calendarFocused: false,
            createdBy: props.ministry ? props.ministry.createdBy : ''
        };
    }
    onMinistryNameChange = (e) => {
        const ministryName = e.target.value;
        this.setState(() => ({ ministryName }));
    };
    onMinistryGenreChange = (e) => {
        const ministryGenre = e.target.value;
        this.setState(() => ({ ministryGenre }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.ministryName || !this.state.ministryGenre) {
            this.setState(() => ({ error: 'Please provide ministry name and genre' }));
            console.log(this.state.error);
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                ministryName: this.state.ministryName,
                ministryGenre: this.state.ministryGenre,
                createdAt: this.state.createdAt.valueOf()
            });
        };
    };
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Ministry Name"
                        autoFocus
                        value={this.state.ministryName}
                        onChange={this.onMinistryNameChange}
                    />
                    <input
                        type="text"
                        placeholder="ministryGenre"
                        value={this.state.ministryGenre}
                        onChange={this.onMinistryGenreChange}
                    />
                    <button>Add Ministry</button>
                </form>
            </div>
        )
    }
}
