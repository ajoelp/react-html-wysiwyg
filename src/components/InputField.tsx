import styled from 'styled-components';
import getThemeValue from '../utils/getThemeValue';

const InputField = styled.input`
  width: 100%;
  padding: 1em;
  border: 1px solid ${getThemeValue('colors.borderColor')};
  border-radius: ${getThemeValue('rounding')};
`;

export default InputField;
