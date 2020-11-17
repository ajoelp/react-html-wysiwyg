import { EditorState, RichUtils } from 'draft-js';
import React, { FormEvent } from 'react';
import { IconButton } from '../components/IconButton';
import SvgListOrdered from '../components/icons/ListOrdered';
import SvgListUnordered from '../components/icons/ListUnordered';

interface ListsProps {
  onChange(editorState: EditorState): void;
  editorState: EditorState;
}

export const BLOCK_TYPES = [
  { icon: SvgListUnordered, type: 'unordered-list-item' },
  { icon: SvgListOrdered, type: 'ordered-list-item' },
];

export default function Lists(props: ListsProps): JSX.Element {
  const { editorState, onChange } = props;

  const selectBlockType = (type: string) => (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const state = RichUtils.toggleBlockType(editorState, type);
    if (state) {
      onChange(state);
    }
  };

  return (
    <>
      {BLOCK_TYPES.map((blockType) => {
        return (
          <IconButton
            data-testid={`button-${blockType.type}`}
            key={blockType.type}
            className="text-gray-800 hover:bg-indigo-500 hover:text-white text-left"
            onClick={selectBlockType(blockType.type)}
          >
            <blockType.icon />
          </IconButton>
        );
      })}
    </>
  );
}
