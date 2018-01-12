import React from 'react';
import { Link } from 'react-router-dom';

export default class SongListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (props) => {
        console.log(this.props.songYoutube);
        this.props.onSubmit({
            id: this.props.id,
            songArtist: this.props.songArtist,
            songYoutube: this.props.songYoutube,
            songName: this.props.songName,
            songKey: this.props.songKey,
            songTempo: this.props.songTempo
        });
    };

    render(){
        return (
            <div>
                <div className="list-item" onClick={this.onSubmit}>
                    <h3>{this.props.songName}</h3>
                    <p>{this.props.songTempo}</p>
                    <p>{this.props.songArtist}</p>
                    <Link to={`/songs/edit/${this.props.id}`}>
                        <button>Edit Song</button>
                    </Link>
                </div>
            </div>
        )
    }
}