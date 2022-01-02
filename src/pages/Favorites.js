import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      toLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  componentDidUpdate() {
    this.fetchy();
  }

  fetcher = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      toLoading: false,
    });
  }

  fetchy = async () => {
    this.setState({
      favorites: await getFavoriteSongs(),
    });
  }

  toFav = async (fav) => {
    console.log(fav);
    this.setState({
      toLoading: true,
    });
    await removeSong(fav);
    this.setState({
      toLoading: false,
    });
  }

  render() {
    const { toLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <h2>Favorites</h2>
        <Header />
        <div>
          {toLoading
            ? <h3>Carregando...</h3>
            : (
              <ul>
                {favorites.map((favorite) => (
                  <MusicCard
                    key={ favorite.trackId }
                    { ...favorite }
                    favTrue
                    callback={ () => this.toFav(favorite) }
                  />))}
              </ul>
            )}
        </div>
      </div>
    );
  }
}
