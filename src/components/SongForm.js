import React from 'react';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 150,
    },
};

export default class SongForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songName: props.song ? props.song.songName : '',
            songArtist: props.song ? props.song.songArtist : '',
            songYoutube: props.song ? props.song.songYoutube : '',
            userId: props.song ? props.song.userId : '',
            updatedAt: props.song ? moment(props.song.updatedAt) : moment(),
            songKey: props.song ? props.song.songKey : '',
            songTempo: props.song ? props.song.songTempo : ''
        };
    }

    // state = {
    //     value: 1,
    // };

    //handleChange = (event, index, value) => this.setState({ value });

    onSongNameChange = (e) => {
        const songName = e.target.value;
        this.setState(() => ({ songName }));
    };
    onSongArtistChange = (e) => {
        const songArtist = e.target.value;
        this.setState(() => ({ songArtist }));
    };
    onSongYoutubeChange = (e) => {
        const songYoutube = e.target.value;
        this.setState(() => ({ songYoutube }));
    };
    onSongKeyChange = (e, index, value) => {
        const songKey = value;
        this.setState(() => ({ songKey }));
        console.log(songKey);
    };
    onSongTempoChange = (e, index, value) => {
        const songTempo = value;
        this.setState(() => ({ songTempo }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.songName || !this.state.songArtist) {
            this.setState(() => ({ error: 'Please provide song name and artist' }));
            console.log(this.state.error);
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                songName: this.state.songName,
                songArtist: this.state.songArtist,
                songYoutube: this.state.songYoutube,
                updatedAt: this.state.updatedAt.valueOf(),
                songKey: this.state.songKey,
                songTempo: this.state.songTempo
            });
        };
    };
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Song Name"
                            autoFocus
                            value={this.state.songName}
                            onChange={this.onSongNameChange}
                        />
                        <input
                            type="text"
                            placeholder="Artist"
                            value={this.state.songArtist}
                            onChange={this.onSongArtistChange}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Youtube Link"
                            value={this.state.songYoutube}
                            onChange={this.onSongYoutubeChange}
                            size="42"
                        />
                        <br />
                        <SelectField
                            floatingLabelText="Key"
                            value={this.state.songKey}
                            onChange={this.onSongKeyChange}
                        >
                            <MenuItem value={"A"} primaryText="A" />
                            <MenuItem value={"B"} primaryText="B" />
                            <MenuItem value={"C"} primaryText="C" />
                            <MenuItem value={"D"} primaryText="D" />
                            <MenuItem value={"E"} primaryText="E" />
                            <MenuItem value={"F"} primaryText="F" />
                            <MenuItem value={"G"} primaryText="G" />
                            <MenuItem value={"A Flat"} primaryText="A Flat" />
                            <MenuItem value={"B Flat"} primaryText="B Flat" />
                            <MenuItem value={"D Flat"} primaryText="D Flat" />
                            <MenuItem value={"E Flat"} primaryText="E Flat" />
                            <MenuItem value={"G Flat"} primaryText="G Flat" />
                        </SelectField>
                        <br />
                        <SelectField
                            floatingLabelText="Tempo"
                            value={this.state.songTempo}
                            onChange={this.onSongTempoChange}
                        >
                            <MenuItem value={"Slow"} primaryText="Slow" />
                            <MenuItem value={"Mid"} primaryText="Mid" />
                            <MenuItem value={"Fast"} primaryText="Fast" />
                        </SelectField><br/>
                        <button>Add Song</button>
                    </form>
                </div>
            </MuiThemeProvider>
        )
    }
}