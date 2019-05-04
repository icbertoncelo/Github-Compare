import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './style';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  handleRepository = async (e) => {
    e.preventDefault();

    const { repositoryInput, repositories } = this.state;

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, repository],
        repositoryInput: '',
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form error={repositoryError} onSubmit={this.handleRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
