import React from 'react';

import { Container, Repository } from './style';

const CompareList = () => (
  <Container>
    <Repository>
      <header>
        <img src="https://avatars3.githubusercontent.com/u/69631?v=4" alt="Facebook" />
        <strong>React</strong>
        <small>Facebok</small>
      </header>

      <ul>
        <li>
          87,29 <small>Stars</small>
        </li>
        <li>
          87,29 <small>Forks</small>
        </li>
        <li>
          87,29 <small>Issues</small>
        </li>
        <li>
          2 days ago <small>Last Commit</small>
        </li>
      </ul>
    </Repository>
  </Container>
);

export default CompareList;
