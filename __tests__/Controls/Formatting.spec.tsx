import { fireEvent, render } from '@testing-library/react';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';
import Formatting, { FORMATTING_OPTIONS } from '../../src/Controls/Formatting';

describe('Formatting', () => {
  const contentBlock = htmlToDraft('<p>Hello World</p>');
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it.each(FORMATTING_OPTIONS.map(type => [type.format]))(`will trigger %s formatting`, format => {
    const onChange = jest.fn();
    const wrapper = render(<Formatting editorState={editorState} onChange={onChange} />);

    const button = wrapper.getByTestId(`button-${format.toLowerCase()}`);

    expect(button).toBeDefined();

    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
