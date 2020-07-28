import React from 'react';
import Editor from '../../src/Editor/index';
import { render } from '@testing-library/react';

describe('Editor', () => {
  it('will render the component', () => {
    const wrapper = render(<Editor />);
    expect(wrapper.getByTestId('editor')).toBeTruthy();
  });
});
