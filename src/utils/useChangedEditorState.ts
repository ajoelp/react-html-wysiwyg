import { useEditorState } from '../EditorStateContext';
import { useEffect, EffectCallback } from 'react';
import usePrevious from './usePrevious';

export default function useChangedEditorState(callback: EffectCallback) {
    const { editorState } = useEditorState();
    const previousEditorState = usePrevious(editorState);
    useEffect(() => {
        if (editorState !== previousEditorState) {
            callback();
        }
    }, [editorState]);
}
