import React from 'react';
import { connect } from 'react-redux';
import SongForm from './SongForm';
import { startAddSong } from '../actions/songs';
import SongList from './SongList';

const AddSongPage = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Add Song</div>
      <div className="show-for-desktop">Add Song</div>
    </div>
    <SongForm onSubmit={(song) => {
        props.dispatch(startAddSong(song));
        props.history.push('/songs/create');
        console.log(song);
      }}
    />
    <br />
    <SongList />
  </div>
);

export default connect()(AddSongPage) ;
