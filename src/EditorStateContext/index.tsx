import { CompositeDecorator, ContentState, convertToRaw, Editor, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { createContext, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import decorators from '../Decorators';
import { ReactHtmlEditorProps } from '../ReactHtmlWysisyg';
import customEntityTransform from '../utils/customEntityTransform';

interface EditorStateContext {
    editorState: EditorState;
    readOnly: boolean;
    config: Partial<ReactHtmlEditorProps>;
    focus(): void;
    onChange(newState: EditorState): void;
    setReadOnly(value: boolean): void;
    ref?: RefObject<Editor> | null;
}

const EditorStateContext = createContext<EditorStateContext>({
    editorState: EditorState.createEmpty(),
    readOnly: false,
    config: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setReadOnly() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    focus() {},
});

export function useEditorState(): EditorStateContext {
    const context = useContext(EditorStateContext);
    if (context === undefined) {
        throw new Error('useEditorState must be used inside EditorStateContext');
    }
    return context;
}

interface EditorStateProviderProps {
    value: string;
    children: JSX.Element | JSX.Element[];
    onValueChange(value: string): void;
    config: Partial<ReactHtmlEditorProps>;
}

export default function EditorStateProvider(props: EditorStateProviderProps): JSX.Element {
    const { children, value, onValueChange, config } = props;
    const compositeDecorator = useMemo(() => new CompositeDecorator(decorators), []);
    const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator));
    const [readOnly, setReadOnly] = useState(false);
    const ref = useRef<Editor>(null);

    const focus = useCallback(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);

    useEffect(() => {
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState, compositeDecorator);
            setEditorState(editorState);
        }
    }, []);

    const onChange = (editorState: EditorState) => {
        setEditorState(editorState);
        onValueChange(draftToHtml(convertToRaw(editorState.getCurrentContent()), null, null, customEntityTransform));
    };

    return (
        <EditorStateContext.Provider value={{ editorState, onChange, readOnly, setReadOnly, config, ref, focus }}>
            {children}
        </EditorStateContext.Provider>
    );
}
