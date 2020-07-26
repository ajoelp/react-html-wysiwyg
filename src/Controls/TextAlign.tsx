import { EditorState } from 'draft-js';
import React, { useState, useEffect } from 'react';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';
import SvgAlignLeft from '../components/icons/AlignLeft';
import SvgAlignCenter from '../components/icons/AlignCenter';
import SvgAlignRight from '../components/icons/AlignRight';
import SvgAlignJustify from '../components/icons/AlignJustify';
import { IconButton } from '../components/IconButton';
import useChangedEditorState from '../utils/useChangedEditorState';

interface TextAlignProps {
    onChange(editorState: EditorState): void;
    editorState: EditorState;
    toggleAlignment?(format: string): void;
}

export const ALIGNMENT_OPTIONS = [
    { icon: SvgAlignLeft, format: 'left' },
    { icon: SvgAlignCenter, format: 'center' },
    { icon: SvgAlignRight, format: 'right' },
    { icon: SvgAlignJustify, format: 'justyfy' },
];

export default function TextAlign(props: TextAlignProps): JSX.Element {
    const { editorState, onChange, toggleAlignment: toggleAlignmentProp } = props;
    const [currentAlignment, setCurrentAlignment] = useState(
        editorState ? getSelectedBlocksMetadata(editorState).get('text-align') : undefined,
    );

    useChangedEditorState(() => {
        setCurrentAlignment(getSelectedBlocksMetadata(editorState).get('text-align'));
    });

    const toggleAlignment = (alignment: string) => () => {
        if (toggleAlignmentProp) {
            return toggleAlignmentProp(alignment);
        }
        onChange(setBlockData(editorState, { 'text-align': alignment }));
    };

    return (
        <div className="inline-flex items-center">
            {ALIGNMENT_OPTIONS.map((format) => (
                <IconButton
                    data-testid={`button-${format.format}`}
                    key={format.format}
                    className={`mr-1 ${currentAlignment === format.format ? 'text-indigo-500' : ''}`}
                    onClick={toggleAlignment(format.format)}
                >
                    <format.icon />
                </IconButton>
            ))}
        </div>
    );
}
