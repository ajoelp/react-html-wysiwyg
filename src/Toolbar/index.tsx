import React from 'react';
import * as Controls from '../Controls';
import { useEditorState } from '../EditorStateContext';
import styled from 'styled-components';
import { Box } from '../components/Layout';
import getThemeValue from '../utils/getThemeValue';

type ControlsList = keyof typeof Controls;

interface ToolbarProps {
  controls?: ControlsList[];
}

const DEFAULT_CONTROLS: ControlsList[] = ['formatting', 'blocktype', 'lists', 'alignment', 'link', 'upload'];

const ToolbarWrapper = styled(Box)`
  ${getThemeValue('base')};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${getThemeValue('colors.borderColor')};
  background: white;
  margin-bottom: 1em;
  padding-bottom: 0.5em;
`;

export default function Toolbar(props: ToolbarProps): JSX.Element {
  const { controls = DEFAULT_CONTROLS } = props;
  const { editorState, onChange } = useEditorState();

  const preventDefault = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <ToolbarWrapper onMouseDown={preventDefault}>
      {controls.map(controlName => {
        const Control = Controls[controlName];
        return <Control key={controlName} editorState={editorState} onChange={onChange} />;
      })}
    </ToolbarWrapper>
  );
}
