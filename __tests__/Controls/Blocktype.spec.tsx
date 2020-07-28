import { fireEvent, render, act } from '@testing-library/react';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';
import BlockType, { BLOCK_TYPES } from '../../src/Controls/Blocktype';
import flushPromises from 'flush-promises';

describe('Blocktype', () => {
  const contentBlock = htmlToDraft('<p>Hello World</p>');
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it.each(BLOCK_TYPES.map(type => Object.values(type)))(`will trigger block type %s`, async (_label, type) => {
    const onChange = jest.fn();
    const wrapper = render(<BlockType editorState={editorState} onChange={onChange} />);

    const dropdownButton = wrapper.getByText('Normal');

    fireEvent.click(dropdownButton);

    await act(async () => {
      await flushPromises();
    });

    const button = wrapper.getByTestId(`button-${type}`);

    expect(button).toBeDefined();

    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
