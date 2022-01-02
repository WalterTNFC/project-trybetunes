import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      response: false,
      name: '',
      album: '',
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  fetcher = async () => {
    this.setState({
      toLoading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
      });
    });
    const { match } = this.props;
    const { id } = match.params;
    const result = await getMusics(id);
    const name = result[0].artistName;
    const album = result[0].collectionName;
    this.setState({
      response: true,
      results: result,
      name,
      album,
      toLoading: false,
    });
  }

  toFav = async (id, e) => {
    this.setState({
      toLoading: true,
    });
    const result = await getMusics(id);
    const { checked } = e.target;
    if (!checked) {
      await removeSong(result[0]);
    } else {
      await addSong(result[0]);
    }
    this.setState({
      toLoading: false,
    });
  }

  render() {
    const { name, response, results, album, toLoading, favorites } = this.state;
    return (
      <div>
        <div data-testid="page-album">
          <h2>Album</h2>
          <Header />
        </div>
        {toLoading
          && <h3>Carregando...</h3> }
        {response
          && (
            <>
              <h3
                data-testid="artist-name"
              >
                {name}
              </h3>
              <h3
                data-testid="album-name"
              >
                {album}
              </h3>
              <ul>
                {/* https://stackoverflow.com/questions/40679613/how-to-skip-first-in-map-function */}
                {results.slice(1).map((result) => (
                  <MusicCard
                    key={ result.trackId }
                    { ...result }
                    favorites={ favorites }
                    callback={ (id, e) => this.toFav(id, e) }
                  />
                ))}
              </ul>
            </ >
          )}
      </div>
    );
  }
}
Album.propTypes = {
  id: PropType.number.isRequired,
  match: PropType.shape({
    params: PropType.objectOf(PropType.number),
  }).isRequired,
};
