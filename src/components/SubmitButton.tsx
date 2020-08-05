import styled from 'styled-components';
import getThemeValue from '../utils/getThemeValue';
import { darken } from 'polished';

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${getThemeValue('colors.primary')};
  padding: 1em;
  border: none;
  border-radius: ${getThemeValue('rounding')};
  color: white;
  text-transform: uppercase;
  margin: 1em auto 0;
  &:hover {
    cursor: pointer;
    background-color: ${props => darken(0.1, getThemeValue('colors.primary')(props))};
  }
`;

export default SubmitButton;
