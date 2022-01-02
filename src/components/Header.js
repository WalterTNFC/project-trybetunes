import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  async fetcher() {
    const addName = await getUser();
    this.setState({
      loading: false,
      name: addName.name,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      loading ? (<h2>Carregando...</h2>)
        : (
          <header data-testid="header-component">
            <div data-testid="header-user-name">
              { name }
            </div>
            <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </header>
        )
    );
  }
}

export default Header;
