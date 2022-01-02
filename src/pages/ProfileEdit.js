import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Input from '../components/Input';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      onLoading: true,
      buttonDsb: true,
      redirect: false,
      userName: '',
      userEmail: '',
      userDescription: '',
      userImage: '',
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  changeInp = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.valideButton());
  }

  valideButton = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const name = userName.length > 0;
    const desc = userDescription.length > 0;
    // regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript porém com alteração
    const email = userEmail.length > 0 && userEmail
      .match(/^[^\s@!#$%"'&*()]+@[^\s@!#$%"'&*()]+\.com+$/);
    const img = userImage.length > 0;

    const result = !(name && desc && email && img);
    this.setState({
      buttonDsb: result,
    });
  }

  submiter = async () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    this.setState({
      onLoading: true,
    });
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });
    this.setState({
      onLoading: false,
      redirect: true,
    });
  }

  async fetcher() {
    const result = await getUser();
    this.setState({
      userName: result.name,
      userEmail: result.email,
      userDescription: result.description,
      userImage: result.image,
      onLoading: false,
    }, () => this.valideButton());
  }

  render() {
    const { redirect, buttonDsb, onLoading, userName, userDescription, userEmail,
      userImage } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <h2>ProfileEdit</h2>
        <Header />
        { onLoading
          ? (<h3>Carregando...</h3>)
          : (
            <form>
              <Input
                label="Nome de usuário: "
                id="userName"
                name="name"
                test="name"
                value={ userName }
                callback={ this.changeInp }
                placeholder="The Magnific"
              />
              <Input
                label="Email de usuário: "
                id="userEmail"
                name="email"
                test="email"
                value={ userEmail }
                callback={ this.changeInp }
                placeholder="stitchgoodguy@betroybe.com"
              />
              <Input
                label="Bio: "
                id="userDescription"
                name="description"
                test="description"
                value={ userDescription }
                callback={ this.changeInp }
                placeholder="A história começou quando um App esquesito,
                pulou na minha tela[...]"
                type="textarea"
              />
              <Input
                label="User photo: "
                id="userImage"
                name="image"
                test="image"
                value={ userImage }
                callback={ this.changeInp }
                placeholder="~Mr. Bean smile~"
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ buttonDsb }
                onClick={ this.submiter }
              >
                Salvar
              </button>
              {redirect
                && <Redirect to="/profile" exact />}
            </form>
          )}
      </div>
    );
  }
}
