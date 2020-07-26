import { ContentBlock, ContentState, EditorState } from 'draft-js';
import { useEditorState } from '../EditorStateContext';
import formatInputData from './formatInputData';
import { useCallback, ChangeEvent, useState } from 'react';

export default function useUpdateBlockEntityData(block: ContentBlock, contentState: ContentState) {
    const { editorState, onChange } = useEditorState();
    const [dummy, setDummy] = useState(false);
    const updateBlockEntityData = useCallback(
        (key: string) => (value: string | ChangeEvent<HTMLInputElement>) => {
            const entityKey = block.getEntityAt(0);
            contentState.mergeEntityData(entityKey, { [key]: formatInputData(value) });
            onChange(EditorState.push(editorState, contentState, 'change-block-data'));
            setDummy(!dummy);
        },
        [dummy],
    );

    return { updateBlockEntityData };
}

export function useUpdateEntityData(entityKey: string, contentState: ContentState) {
    const { editorState, onChange } = useEditorState();
    const [dummy, setDummy] = useState(false);
    const updateBlockEntityData = useCallback(
        (key: string) => (value: string | ChangeEvent<HTMLInputElement>) => {
            contentState.mergeEntityData(entityKey, { [key]: formatInputData(value) });
            onChange(EditorState.push(editorState, contentState, 'change-block-data'));
            setDummy(!dummy);
        },
        [dummy],
    );

    return { updateBlockEntityData };
}
