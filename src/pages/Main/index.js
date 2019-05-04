import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './style';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
  };

  handleRepository = async (e) => {
    e.preventDefault();

    const { repositoryInput, repositories } = this.state;

    try {
      const response = await api.get(`/repos/${repositoryInput}`);

      this.setState({
        repositories: [...repositories, response.data],
        repositoryInput: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { repositories, repositoryInput } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form onSubmit={this.handleRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
