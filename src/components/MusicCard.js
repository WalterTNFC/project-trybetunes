import React, { Component } from 'react';
import PropType from 'prop-types';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      toLoading: false,
    };
  }

  render() {
    const { toLoading } = this.state;
    const { previewUrl, trackName, trackId, favorites, favTrue, callback,
    } = this.props;

    return (
      <li>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ (e) => callback(trackId, e) }
            id={ trackId }
            defaultChecked={ favorites
              ? (favorites.find((favorite) => favorite.trackId === trackId))
              : (favTrue) }
          />
        </label>
        {
          toLoading
          && <h3>Carregando...</h3>
        }
      </li>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropType.string.isRequired,
  trackName: PropType.string.isRequired,
  trackId: PropType.number.isRequired,
  favorites: PropType.shape({
    find: PropType.func.isRequired,
    trackId: PropType.number.isRequired,
  }).isRequired,
  favTrue: PropType.bool.isRequired,
  callback: PropType.func.isRequired,
};
