import { EditorState, RichUtils } from 'draft-js';
import { getSelectionInlineStyle } from 'draftjs-utils';
import React, { useState } from 'react';
import { IconButton } from '../components/IconButton';
import SvgBold from '../components/icons/Bold';
import SvgItalic from '../components/icons/Italic';
import SvgUnderline from '../components/icons/Underline';
import useChangedEditorState from '../utils/useChangedEditorState';

interface FormattingProps {
  onChange(editorState: EditorState): void;
  editorState: EditorState;
}

export const FORMATTING_OPTIONS = [
  { icon: SvgBold, format: 'BOLD' },
  { icon: SvgItalic, format: 'ITALIC' },
  { icon: SvgUnderline, format: 'UNDERLINE' },
];

export default function Formatting(props: FormattingProps): JSX.Element {
  const { editorState, onChange } = props;
  const [currentFormats, setCurrentFormats] = useState(editorState ? getSelectionInlineStyle(editorState) : {});

  useChangedEditorState(() => {
    setCurrentFormats(getSelectionInlineStyle(editorState));
  });

  const toggleInlineStyle = (style: string) => () => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    if (newState) {
      onChange(newState);
    }
  };

  return (
    <div className="inline-flex items-center text-gray-800">
      {FORMATTING_OPTIONS.map(format => (
        <IconButton
          data-testid={`button-${format.format.toLowerCase()}`}
          key={format.format}
          className={`mr-1 ${!!currentFormats[format.format] ? 'text-indigo-500' : ''}`}
          onClick={toggleInlineStyle(format.format)}
        >
          <format.icon />
        </IconButton>
      ))}
    </div>
  );
}
