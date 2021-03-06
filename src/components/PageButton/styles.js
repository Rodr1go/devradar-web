import styled from 'styled-components';

export const Button = styled.button.attrs()`
  font-size: 14px;
  cursor: pointer;
  color: #028478;
  font-weight: bold;
  line-height: 1.25;
  border-radius: 4px;
  padding: .5rem .75rem;
  background-color: #fff;
  transition: background 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 40%;
    cursor: not-allowed;
  }`;