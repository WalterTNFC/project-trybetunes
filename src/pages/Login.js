import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
      userCreated: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { name } = this.state;
    this.setState({ isLoading: true });

    createUser({ name })
      .then(() => {
        this.setState({
          isLoading: false,
          userCreated: true,
        });
      });
  }

  render() {
    // Criação dos estados
    const {
      name,
      isLoading,
      userCreated,
    } = this.state;

    // Para limitar a quantidade minima de caracteres do nome
    const maxvalue = 3;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
            Input
          </label>

          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ name.length < maxvalue }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>

        {isLoading && <h1>Carregando...</h1>}
        {userCreated && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
