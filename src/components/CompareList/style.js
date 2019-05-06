import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 240px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 18px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: none;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #e0ffff;
      }
    }
  }

  div.compare-list-actions {
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;

    button {
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: bold;

      i {
        margin-right: 3px;
      }

      &:nth-child(2n) {
        border: 1px solid #8b0000;
        color: #8b0000;
        background: #fff;

        &:hover {
          background: #8b0000;
          color: #fff;
        }
      }

      &:nth-child(2n - 1) {
        border: 1px solid #116088;
        color: #116088;
        background: #fff;

        &:hover {
          background: #0e5071;
          color: #fff;
        }
      }
    }
  }
`;
