import React from 'react';
import * as Controls from '../Controls';
import { useEditorState } from '../EditorStateContext';

type ControlsList = keyof typeof Controls;

interface ToolbarProps {
  controls?: ControlsList[];
}

const DEFAULT_CONTROLS: ControlsList[] = ['formatting', 'blocktype', 'lists', 'alignment', 'link', 'upload'];

export default function Toolbar(props: ToolbarProps): JSX.Element {
  const { controls = DEFAULT_CONTROLS } = props;
  const { editorState, onChange } = useEditorState();

  const preventDefault = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center border-b px-2 bg-white sticky top-0 z-50 mb-2 py-2" onMouseDown={preventDefault}>
      {controls.map(controlName => {
        const Control = Controls[controlName];
        return <Control key={controlName} editorState={editorState} onChange={onChange} />;
      })}
    </div>
  );
}
