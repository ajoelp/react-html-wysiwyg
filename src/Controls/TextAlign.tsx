import { EditorState } from 'draft-js';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';
import React, { useState } from 'react';
import { IconButton } from '../components/IconButton';
import SvgAlignCenter from '../components/icons/AlignCenter';
import SvgAlignJustify from '../components/icons/AlignJustify';
import SvgAlignLeft from '../components/icons/AlignLeft';
import SvgAlignRight from '../components/icons/AlignRight';
import useChangedEditorState from '../utils/useChangedEditorState';
import { Box } from '../components/Layout';

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
    editorState ? getSelectedBlocksMetadata(editorState).get('text-align') : undefined
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
    <Box display="inline-flex" alignItems="center">
      {ALIGNMENT_OPTIONS.map(format => (
        <IconButton
          data-testid={`button-${format.format}`}
          key={format.format}
          active={currentAlignment === format.format}
          onClick={toggleAlignment(format.format)}
        >
          <format.icon />
        </IconButton>
      ))}
    </Box>
  );
}
