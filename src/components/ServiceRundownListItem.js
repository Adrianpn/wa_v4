import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class ServiceRundownListItem extends React.Component {
    render() {
        return (
            <div className="flex-container">
                <div className="card">
                    <div className="card-image"></div>
                    <div className="card-content">
                        <h1>{moment(this.props.serviceDate).format("dddd, MMMM Do YYYY")}</h1>
                        <div className="subtitle">{this.props.ministry.ministryName}</div>
                        <ComponentSongList
                            songList={this.props.songList}
                        />
                        <div className="card-details">
                            <div className="card-details-inner">
                                <div className="read-more">
                                    <Link className="button" to={`/service/${this.props.id}`}>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ComponentSongList extends React.Component {
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

const Song = ({ songArtist, songName, songYoutube, songTempo, songKey }) => (
    <div>
        {
            songYoutube === undefined ? (
                <h1>
                    {songName}
                </h1>
            ) : (
                    <h1>
                        <a href={`http://${songYoutube}`}>{songName}</a>
                    </h1>
                )
        }
    </div>
);


const mapStateToProps = (state, props) => {
    return {
        ministry: state.ministries.find((service) => service.id === props.ministryId)
        //service: state.services.find((service) => service.id === props.id)
    };
};

export default connect(mapStateToProps)(ServiceRundownListItem);