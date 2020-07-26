import { EditorState, Entity, Modifier, RichUtils } from 'draft-js';
import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { getSelectionText, getEntityRange, getSelectionEntity } from 'draftjs-utils';
import Editor from '../Editor';
import ToolbarButton from '../components/ToolbarButton';
import useChangedEditorState from '../utils/useChangedEditorState';
import { IconButton } from '../components/IconButton';
import SvgLink from '../components/icons/Link';

interface LinkProps {
    onChange(editorState: EditorState): void;
    editorState: EditorState;
}

export default function Link(props: LinkProps): JSX.Element {
    const { editorState, onChange } = props;
    const [currentEntity, setCurrentEntity] = useState<string>(
        editorState ? getSelectionEntity(editorState) : undefined,
    );

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

    const getSelection = () => {
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
        console.log(currentEntity, selection);
        return selection;
    };

    const removeLink = useCallback(() => {
        onChange(RichUtils.toggleLink(editorState, getSelection(), null));
    }, [editorState]);

    const addLink = useCallback(
        (title: string, url: string, targetOption: string) => {
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
        [editorState],
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
