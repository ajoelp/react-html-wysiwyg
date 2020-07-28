import { EditorState, RichUtils } from 'draft-js';
import { getEntityRange, getSelectionEntity, getSelectionText } from 'draftjs-utils';
import React, { FormEvent, useCallback, useState } from 'react';
import { IconButton } from '../components/IconButton';
import SvgLink from '../components/icons/Link';
import useChangedEditorState from '../utils/useChangedEditorState';

interface LinkProps {
  onChange(editorState: EditorState): void;
  editorState: EditorState;
}

export default function Link(props: LinkProps): JSX.Element {
  const { editorState, onChange } = props;
  const [currentEntity, setCurrentEntity] = useState<string>(editorState ? getSelectionEntity(editorState) : undefined);

  const onClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();

    const isExistingLink = currentEntity && contentState.getEntity(currentEntity).getType() === 'LINK';

    if (isExistingLink) {
      removeLink();
      return;
    }

    addLink(getSelectionText(editorState) ?? 'Click Here', '#', '_blank');
  };

  const getSelection = useCallback(() => {
    let selection = editorState.getSelection();
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      const isBackward = selection.getIsBackward();
      if (isBackward) {
        selection = selection.merge({
          anchorOffset: entityRange.end,
          focusOffset: entityRange.start,
        });
      } else {
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end,
        });
      }
    }
    return selection;
  }, [currentEntity, editorState]);

  const removeLink = useCallback(() => {
    onChange(RichUtils.toggleLink(editorState, getSelection(), null));
  }, [editorState, getSelection, onChange]);

  const addLink = useCallback(
    (_title: string, url: string, targetOption: string) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWIthEntity = contentState.createEntity('LINK', 'MUTABLE', {
        url,
        targetOption,
        startOpen: true,
      });
      const entityKey = contentStateWIthEntity.getLastCreatedEntityKey();

      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWIthEntity });

      onChange(RichUtils.toggleLink(newEditorState, getSelection(), entityKey));
    },
    [editorState, getSelection, onChange]
  );

  useChangedEditorState(() => {
    setCurrentEntity(getSelectionEntity(editorState));
  });

  return (
    <IconButton onMouseDown={onClick}>
      <SvgLink />
    </IconButton>
  );
}
