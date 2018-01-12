import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SongList from './SongList';
import ServiceList from './ServiceList';
import moment from 'moment';


const ShowServicePage = (props) => (
  <div className="content-container">{console.log(props.service)}
        <div className="list-header">
          <h1>Service Rundown</h1>
          <h2>{moment(props.service.serviceDate).format('MMMM Do, YYYY, h a')}</h2>
          <Link to={`/service/edit/${props.service.id}`}>
            <button>Edit Service</button>
          </Link>
        </div>
        <div className="list-body">
          <Songs {...props} />
        </div>
      </div>
);

const Songs = (props) => (
  <div>
    {
      props.service.songList === undefined || props.service.songList.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Songs Added To Service Rundown</span>
        </div>
      ) : (
          Object.values(props.service.songList).map((song, index) => <Song key={index} {...song} />)
        )
    }  {console.log(Object.values(props.service.songList))} 
  </div>
);

const Song = ({ 
                songArtist = 'Add Artist', 
                songName = 'Add Song', 
                songTempo = 'Add Tempo',
                songKey = 'Add Key'
              } = {}) => (
    <div className="list-item">
      <h3 className="list-item__title">{ songName }</h3>
      <span className="list-item__sub-title">Key: {songKey}</span>
      <span className="list-item__sub-title">Tempo: {songTempo}</span>
      <span className="list-item__sub-title">{songArtist}</span>
    </div>
);

// const SongsRundown = (props) => (
//   console.log(props.service.songList)
// );

const mapStateToProps = (state, props) => ({
  service: state.services.find((service) => service.id === props.match.params.id)
});

export default connect(mapStateToProps)(ShowServicePage);