import React from 'react';
import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Editor.css';
import { useEditorState } from '../EditorStateContext';
import useHandleKeyCommand from '../utils/useHandleKeyCommand';
import blockStyleFunction from '../utils/blockStyleFunction';
import blockRenderFunction from '../utils/blockRenderFunction';

interface EditorProps {
    placeholder?: string;
    className?: string;
}

export default function Editor(props: EditorProps): JSX.Element {
    const { placeholder = 'Type Here', className } = props;
    const { editorState, onChange, readOnly, ref, focus } = useEditorState();
    const handleKeyCommand = useHandleKeyCommand();

    return (
        <div data-testid="editor" onClick={focus}>
            <div className={className}>
                <DraftEditor
                    ref={ref}
                    placeholder={placeholder}
                    editorState={editorState}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={blockStyleFunction}
                    readOnly={readOnly}
                    blockRendererFn={blockRenderFunction(editorState)}
                />
            </div>
        </div>
    );
}
