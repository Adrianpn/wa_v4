import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Modal from 'react-modal';
// import MinistryAdminList from './MinistryAdminList';
import SongList from './SongList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         WebkitOverflowScrolling: 'touch'
//     }
// };

const styles = {
    radioButton: {
        marginTop: 16,
    },
};

export default class ServiceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceDate: props.service ? moment(props.service.serviceDate) : moment(),
            createdBy: props.service ? props.service.createdBy : '',
            ministryId: props.service ? props.service.ministryId : '',
            ministryName: props.service ? props.service.ministryName : '',
            songList: props.service ? props.service.songList : [],
            createdAt: props.service ? moment(props.service.createdAt) : moment(),
            error: '',
            modalIsOpen: false,
            open: false
        };
    }

    // afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     //this.subtitle.style.color = '#f00';
    // };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    onDateChange = (serviceDate) => {
        if (serviceDate) {
            this.setState(() => ({ serviceDate }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };


    onSetSong = (song) => {
        this.setState({ modalIsOpen: false });
        this.setState(() => ({ songList: [...this.state.songList, ...[song]] }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ modalIsOpen: false });

        this.setState(() => ({ error: '' }));

        this.props.onSubmit({
            createdAt: moment().valueOf(),
            serviceDate: this.state.serviceDate.valueOf(),
            songList: this.state.songList
        });
        console.log(this.state.songList);
    };

    onMinistrySubmit = (e) => {
        e.preventDefault();
        this.setState({ modalIsOpen: true });
    };
    
    render(){
        const actions = [
            // <FlatButton
            //     label="Cancel"
            //     primary={true}
            //     onClick={this.handleClose}
            // />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <MuiThemeProvider>
                <div>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onMinistrySubmit}>
                        <RaisedButton label="Add Song" onClick={this.handleOpen} />
                        <Dialog
                            title="Add Song"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            autoScrollBodyContent={true}
                        >
                            <SongList onSubmit={this.onSetSong} />
                        </Dialog>
                        {/* <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Song Modal"
                        >
                            <SongList onSubmit={this.onSetSong} />
                        </Modal>
                        <button>Add Song</button> */}
                    </form>
                    <form>
                        <SingleDatePicker
                        date={this.state.serviceDate} // momentPropTypes.momentObj or null
                        onDateChange={this.onDateChange} // PropTypes.func.isRequired
                        focused={this.state.calendarFocused} // PropTypes.bool
                        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        />
                        <button onClick={this.onSubmit}>Add Service</button>
                    </form>
                    <h1>Song List</h1>
                    <Songs
                        songList={this.state.songList}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

class Songs extends React.Component {
    render() {
        return (
            <div>{console.log(this.props.songList)}
                {
                    this.props.songList === undefined ? (
                        <div>
                            <span>Please Add Songs</span>
                        </div>
                    ) : (
                            this.props.songList.map((song, index) => <Song key={index} {...song} />)
                        )
                }  
            </div>
        );
    }
}

const Song = ({ songArtist, songName, songTempo, songKey }) => (
    <div>
        <h2>{songName}</h2>
        <h3>{songArtist}</h3>
    </div>
);

// const mapDispatchToProps = (dispatch, props) => ({
//     addService: (songList) => dispatch(addService(songList))
// });

// export default connect(undefined, mapDispatchToProps)(ServiceForm);