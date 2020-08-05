import React from 'react';
import Editor from './Editor';
import EditorStateProvider from './EditorStateContext';
import Toolbar from './Toolbar';
import DialogManager from './DialogManager';
import ThemeManager from './components/ThemeManager';
import JsonObject from './types/JsonObject';
import styled from 'styled-components';
import { Box } from './components/Layout';
import getThemeValue from './utils/getThemeValue';

export interface ReactHtmlEditorProps {
  value?: string;
  onChange?(html: string): void;
  onFileUpload?(file: File): Promise<string>;
  toolbarHidden?: boolean;
  editorClassName?: string;
  height?: number;
  theme?: JsonObject;
  editorWrapper?: React.ElementType;
}

const Wrapper = styled(Box)`
  border: 1px solid ${getThemeValue('colors.borderColor')};
  border-radius: ${getThemeValue('rounding')};
  position: relative;
  padding: 0.5em;
`;

export default function ReactHtmlEditor(props: ReactHtmlEditorProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { editorClassName, theme, value = '', onChange = () => {}, toolbarHidden = false } = props;
  return (
    <ThemeManager theme={theme}>
      <EditorStateProvider value={value} onValueChange={onChange} config={props}>
        <DialogManager>
          <Wrapper>
            {!toolbarHidden && <Toolbar />}
            <Editor className={editorClassName} />
          </Wrapper>
        </DialogManager>
      </EditorStateProvider>
    </ThemeManager>
  );
}
