import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      pesquisando: false,
      nadaEncontrado: false,
      dados: [],
      nomePesquisado: '',
    };

    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }) {
    this.setState({ nome: target.value });
  }

  onSearch(e) {
    e.preventDefault();
    const { nome } = this.state;
    const artista = nome;
    this.setState({ nome: '', pesquisando: true, nomePesquisado: artista });
    searchAlbumsAPI(artista).then(
      (dados) => {
        if (dados.length) {
          this.setState({ dados, nadaEncontrado: false, pesquisando: false });
        } else {
          this.setState({
            dados: [], nadaEncontrado: true, pesquisando: false, nomePesquisado: '' });
        }
      },
    );
  }

  render() {
    const { nome, pesquisando, nadaEncontrado, dados, nomePesquisado } = this.state;
    const minValue = 2;
    const formulario = (
      <form onSubmit={ this.onSearch }>
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.onChange }
            value={ nome }
            placeholder="Nome do Artista"
          />
        </label>
        <button
          type="submit"
          disabled={ nome.length < minValue }
          data-testid="search-artist-button"
        >
          Procurar
        </button>
      </form>
    );

    let links = null;
    if (dados.length) {
      links = (dados.map((i) => (
        <Link
          key={ i.collectionId }
          to={ `/album/${i.collectionId}` }
          data-testid={ `link-to-album-${i.collectionId}` }
        >
          {i.collectionName}
        </Link>
      )));
    }
    return (
      <div data-testid="page-search">
        <Header />
        { pesquisando ? null : formulario}
        { nadaEncontrado ? 'Nenhum álbum foi encontrado' : null }
        { (dados.length && !pesquisando && !nadaEncontrado)
          ? `Resultado de álbuns de: ${nomePesquisado}` : null}
        {links}
      </div>
    );
  }
}

export default Search;
