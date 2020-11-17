import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import { useDialog } from '../DialogManager';

interface EmbeddedLinkProps {
  block: ContentBlock;
  contentState: ContentState;
}

export default function EmbeddedLink(props: EmbeddedLinkProps): JSX.Element {
  const { contentState, block } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height = 'auto', width = '200px', textAlign } = entity.getData();
  const { openDialog } = useDialog();
  return (
    <div
      className="relative"
      style={{ textAlign }}
      onMouseDown={(e) => {
        e.preventDefault();
        openDialog('embed', { contentState, block, entity });
      }}
    >
      <div className="inline-block pointer-events-none">
        <iframe
          title={src}
          width={width}
          height={height}
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
