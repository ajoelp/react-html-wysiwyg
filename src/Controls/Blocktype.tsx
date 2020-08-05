import { EditorState, RichUtils } from 'draft-js';
import { getSelectedBlocksType } from 'draftjs-utils';
import React, { FormEvent, useState } from 'react';
import { Dropdown, DropdownButton, DropdownMenu, DropdownTrigger } from '../components/Dropdown';
import useChangedEditorState from '../utils/useChangedEditorState';
import styled from 'styled-components';
import getThemeValue from '../utils/getThemeValue';

interface BlockTypeProps {
  onChange(editorState: EditorState): void;
  editorState: EditorState;
}

export const BLOCK_TYPES = [
  { label: 'Normal', type: 'unstyled' },
  { label: 'Heading 1', type: 'header-one' },
  { label: 'Heading 2', type: 'header-two' },
  { label: 'Heading 3', type: 'header-three' },
  { label: 'Heading 4', type: 'header-four' },
  { label: 'Heading 5', type: 'header-five' },
  { label: 'Heading 6', type: 'header-six' },
  { label: 'Blockquote', type: 'blockquote' },
  { label: 'Code', type: 'code' },
];

const BlockTypeButton = styled(DropdownButton)`
  display: block;
  width: 100%;
  padding: 1em 0.5em;
  text-align: left;
  &:hover {
    cursor: pointer;
    background-color: ${getThemeValue('colors.primary')};
  }
`;

const BlockTypeTrigger = styled(DropdownTrigger)`
  height: 30px;
  width: auto;
  border: 1px solid ${getThemeValue('colors.borderColor')};
  border-radius: ${getThemeValue('rounding')};
  padding: 0.5em;
  margin-right: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${getThemeValue('colors.primary')};
    cursor: pointer;
  }
`;

export default function BlockType(props: BlockTypeProps): JSX.Element {
  const { editorState, onChange } = props;
  const [currentBlock, setCurrentBlock] = useState(editorState ? getSelectedBlocksType(editorState) : 'unstyled');

  useChangedEditorState(() => {
    setCurrentBlock(getSelectedBlocksType(editorState));
  });

  const selectedBlock = BLOCK_TYPES.find(block => block.type === currentBlock);

  const selectBlockType = (type: string) => (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const state = RichUtils.toggleBlockType(editorState, type);
    if (state) {
      onChange(state);
    }
  };

  return (
    <Dropdown>
      <BlockTypeTrigger>{selectedBlock?.label ?? '-'}</BlockTypeTrigger>
      <DropdownMenu>
        {BLOCK_TYPES.map(blockType => {
          return (
            <BlockTypeButton
              data-testid={`button-${blockType.type}`}
              key={blockType.type}
              onClick={selectBlockType(blockType.type)}
            >
              {blockType.label}
            </BlockTypeButton>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
