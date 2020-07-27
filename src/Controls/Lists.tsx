import { EditorState, RichUtils } from 'draft-js';
import React, { useState, FormEvent, useEffect } from 'react';
import { getSelectedBlocksType } from 'draftjs-utils';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownButton } from '../components/Dropdown';
import useChangedEditorState from '../utils/useChangedEditorState';
import SvgListUnordered from '../components/icons/ListUnordered';
import SvgListOrdered from '../components/icons/ListOrdered';
import { IconButton } from '../components/IconButton';

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
    const [currentBlock, setCurrentBlock] = useState(editorState ? getSelectedBlocksType(editorState) : 'unstyled');

    useChangedEditorState(() => {
        setCurrentBlock(getSelectedBlocksType(editorState));
    });

    const selectedBlock = BLOCK_TYPES.find((block) => block.type === currentBlock);

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
