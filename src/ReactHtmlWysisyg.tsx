import React from 'react';
import Editor from './Editor';
import EditorStateProvider from './EditorStateContext';
import Toolbar from './Toolbar';
import DialogManager from './DialogManager';

export interface ReactHtmlEditorProps {
  value?: string;
  onChange?(html: string): void;
  onFileUpload?(file: File): Promise<string>;
  toolbarHidden?: boolean;
  editorClassName?: string;
  height?: number;
}

export default function ReactHtmlEditor(props: ReactHtmlEditorProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { editorClassName, value = '', onChange = () => {}, toolbarHidden = false } = props;
  return (
    <EditorStateProvider value={value} onValueChange={onChange} config={props}>
      <DialogManager>
        <div className="rounded border relative p-2">
          {!toolbarHidden && <Toolbar />}
          <Editor className={editorClassName} />
        </div>
      </DialogManager>
    </EditorStateProvider>
  );
}
