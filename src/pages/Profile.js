import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Carregando...',
      userEmail: '',
      userDescription: '',
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  async fetcher() {
    const result = await getUser();
    this.setState({
      userName: result.name,
      userEmail: result.email,
      userDescription: result.description,
      userImage: result.image,
    });
  }

  render() {
    const { userName, userDescription, userEmail, userImage } = this.state;
    return (
      <div data-testid="page-profile">
        <h2>Profile</h2>
        <Header />
        <div>
          <img
            width="170px"
            data-testid="profile-image"
            src={ userImage }
            alt={ `${userName} pic` }
          />
          <h3>Nome</h3>
          <h4>{userName}</h4>
          <h3>Email</h3>
          <h4>{userEmail}</h4>
          <h3>Descrição</h3>
          <h4>{userDescription}</h4>
          <button type="button"><Link to="/profile/edit">Editar perfil</Link></button>
        </div>
      </div>
    );
  }
}
