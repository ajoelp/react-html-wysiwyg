import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Editor.css';
import { useEditorState } from '../EditorStateContext';
import useHandleKeyCommand from '../utils/useHandleKeyCommand';
import blockStyleFunction from '../utils/blockStyleFunction';
import blockRenderFunction from '../utils/blockRenderFunction';
import styled from 'styled-components';

interface EditorProps {
  placeholder?: string;
  className?: string;
}

const EditorWrapperComponent = styled.div``;

export default function Editor(props: EditorProps): JSX.Element {
  const { placeholder = 'Type Here', className } = props;
  const { editorState, onChange, readOnly, ref, focus, config } = useEditorState();
  const handleKeyCommand = useHandleKeyCommand();

  const EditorWrapper = config.editorWrapper ?? EditorWrapperComponent;

  return (
    <div data-testid="editor" onClick={focus}>
      <Scrollbars
        style={{ overflow: 'hidden' }}
        autoHeight
        autoHeightMin={config.height ?? 300}
        autoHeightMax={config.height ?? 300}
      >
        <EditorWrapper className={className} ref={ref}>
          <DraftEditor
            placeholder={placeholder}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            blockStyleFn={blockStyleFunction}
            readOnly={readOnly}
            blockRendererFn={blockRenderFunction(editorState)}
          />
        </EditorWrapper>
      </Scrollbars>
    </div>
  );
}
