import { ContentBlock, ContentState } from 'draft-js';
import React from 'react';
import { useEditorState } from '../EditorStateContext';
import TextAlign from '../Controls/TextAlign';
import useUpdateBlockEntityData from '../utils/useUpdateBlockEntityData';
import Popover from '../components/Popover';

interface ImageProps {
    block: ContentBlock;
    contentState: ContentState;
}

export default function Image(props: ImageProps): JSX.Element {
    const { contentState, block } = props;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src, height = 'auto', width = '200px', alt, textAlign } = entity.getData();
    const { editorState, onChange } = useEditorState();
    const { updateBlockEntityData } = useUpdateBlockEntityData(block, contentState);

    return (
        <Popover
            render={() => (
                <div>
                    <div>
                        <p className="text-sm uppercase text-gray-600 mb-1">Alignment</p>
                        <TextAlign
                            {...{ editorState, onChange, toggleAlignment: updateBlockEntityData('textAlign') }}
                        />
                    </div>
                    <div className="flex">
                        <div className="w-1/2 mr-2">
                            <p className="text-sm uppercase text-gray-600 mb-1">Width</p>
                            <input
                                type="text"
                                className="border px-3 py-1 w-full rounded"
                                value={width}
                                onChange={updateBlockEntityData('width')}
                            />
                        </div>
                        <div className="w-1/2">
                            <p className="text-sm uppercase text-gray-600 mb-1">Height</p>
                            <input
                                type="text"
                                className="border px-3 py-1 w-full rounded"
                                value={height}
                                onChange={updateBlockEntityData('height')}
                            />
                        </div>
                    </div>
                </div>
            )}
        >
            <div className="relative" style={{ textAlign }}>
                <img className="inline-block" {...{ src, alt, style: { height, width, margin: 0 } }} />
            </div>
        </Popover>
    );
}
