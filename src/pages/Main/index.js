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

  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || [];

  handleRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, repository],
        repositoryInput: '',
        repositoryError: false,
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        '@GitCompare:repositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  updateReporitory = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositoryError: false,
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  removeRepository = async (id) => {
    const { repositories } = this.state;

    const newRepositories = await repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: newRepositories });

    await localStorage.setItem('@GitCompare:repositories', JSON.stringify(newRepositories));
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

        <CompareList
          repositories={repositories}
          removeRepository={this.removeRepository}
          updateRepository={this.updateReporitory}
        />
      </Container>
    );
  }
}
