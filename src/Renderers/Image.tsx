import { ContentBlock, ContentState } from 'draft-js';
import React from 'react';
import { useDialog } from '../DialogManager';

interface ImageProps {
  block: ContentBlock;
  contentState: ContentState;
}

export default function Image(props: ImageProps): JSX.Element {
  const { contentState, block } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height = 'auto', width = '200px', alt, textAlign } = entity.getData();

  const { openDialog } = useDialog();

  return (
    <div
      className="relative"
      style={{ textAlign }}
      onMouseDown={() => openDialog('image', { block, contentState, entity })}
    >
      <img className="inline-block" {...{ src, alt, style: { height, width, margin: 0 } }} />
    </div>
  );
}
