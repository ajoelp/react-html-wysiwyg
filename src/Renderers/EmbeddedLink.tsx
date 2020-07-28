import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import { useEditorState } from '../EditorStateContext';
import TextAlign from '../Controls/TextAlign';
import useUpdateBlockEntityData from '../utils/useUpdateBlockEntityData';
import Popover from '../components/Popover';

interface EmbeddedLinkProps {
  block: ContentBlock;
  contentState: ContentState;
}

export default function EmbeddedLink(props: EmbeddedLinkProps): JSX.Element {
  const { contentState, block } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height = 'auto', width = '200px', textAlign } = entity.getData();
  const { editorState, onChange } = useEditorState();

  const { updateBlockEntityData } = useUpdateBlockEntityData(block, contentState);
  return (
    <Popover
      render={() => (
        <div>
          <div>
            <p className="text-sm uppercase text-gray-600 mb-1">Alignment</p>
            <TextAlign {...{ editorState, onChange, toggleAlignment: updateBlockEntityData('textAlign') }} />
          </div>
          <div className="flex mb-2">
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
          <div>
            <p className="text-sm uppercase text-gray-600 mb-1">Source</p>
            <input
              type="text"
              className="border px-3 py-1 w-full rounded"
              value={src}
              onChange={updateBlockEntityData('src')}
            />
          </div>
        </div>
      )}
    >
      <div className="relative" style={{ textAlign }}>
        <div className="inline-block">
          <iframe
            width={width}
            height={height}
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </Popover>
  );
}
