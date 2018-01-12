import React from 'react';
import { connect } from 'react-redux';
import SongForm from './SongForm';
import { startEditSong, startRemoveSong } from '../actions/songs';

const EditSongPage = (props) => {
  return (
    <div className="card__container">
      <h1>Edit Song</h1>
      <SongForm
        song={props.song}
        onSubmit={(song) => {
          console.log('updated', song);
          props.dispatch(startEditSong(props.song.id, song));
          props.history.push('/');
        }}
      />
      <button onClick={() => {
        props.dispatch(startRemoveSong({id: props.song.id}));
        props.history.push('/');
      }}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    song: state.songs.find((song) => song.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditSongPage);
