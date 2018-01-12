import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './SongListItem';

class SongList extends React.Component {
    onSubmit = (props) => {
        // this.props.startEditExpense(this.props.expense.id, expense);
        console.log(props.songYoutube);
        this.props.onSubmit({
            songId: props.id,
            songArtist: props.songArtist,
            songName: props.songName,
            songYoutube: props.songYoutube,
            songKey: props.songKey,
            songTempo: props.songTempo
        });
    };

    render() {
        return (
            <div>
                <div className="list-header">
                    <div className="show-for-mobile">Song List</div>
                    <div className="show-for-desktop">Song List</div>
                </div>
                {this.props.songs.map((song) => {
                    return <SongListItem key={song.id} {...song} onSubmit={this.onSubmit} />
                })}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        songs: state.songs
    };
};

export default connect(mapStateToProps)(SongList);