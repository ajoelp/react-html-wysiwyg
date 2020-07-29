import { ContentBlock, ContentState, EditorState } from 'draft-js';
import { useEditorState } from '../EditorStateContext';
import { useCallback, useState } from 'react';

export function useUpdateEntityData(entityKey: string, contentState: ContentState) {
  const { editorState, onChange } = useEditorState();
  const [dummy, setDummy] = useState(false);
  const updateBlockEntityData = useCallback(
    (value: any) => {
      contentState.mergeEntityData(entityKey, value);
      onChange(EditorState.push(editorState, contentState, 'change-block-data'));
      setDummy(!dummy);
    },
    [contentState, dummy, editorState, entityKey, onChange]
  );

  return { updateBlockEntityData };
}

export function useUpdateBlockData(block: ContentBlock, contentState: ContentState) {
  const { editorState, onChange } = useEditorState();
  const [dummy, setDummy] = useState(false);
  const updateBlockEntityData = useCallback(
    (value: any) => {
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(entityKey, value);
      onChange(EditorState.push(editorState, contentState, 'change-block-data'));
      setDummy(!dummy);
    },
    [block, contentState, dummy, editorState, onChange]
  );

  return { updateBlockEntityData };
}
