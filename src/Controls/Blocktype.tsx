import { EditorState, RichUtils } from 'draft-js';
import React, { useState, FormEvent, useEffect } from 'react';
import { getSelectedBlocksType } from 'draftjs-utils';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownButton } from '../components/Dropdown';
import useChangedEditorState from '../utils/useChangedEditorState';

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

export default function BlockType(props: BlockTypeProps): JSX.Element {
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
        <Dropdown>
            <DropdownTrigger>{selectedBlock?.label ?? '-'}</DropdownTrigger>
            <DropdownMenu>
                {BLOCK_TYPES.map((blockType) => {
                    return (
                        <DropdownButton
                            data-testid={`button-${blockType.type}`}
                            key={blockType.type}
                            className="block w-full px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white text-left"
                            onClick={selectBlockType(blockType.type)}
                        >
                            {blockType.label}
                        </DropdownButton>
                    );
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
