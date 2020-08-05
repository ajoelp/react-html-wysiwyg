import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import { useDialog } from '../DialogManager';
import styled from 'styled-components';
import { Box } from '../components/Layout';

interface EmbeddedLinkProps {
  block: ContentBlock;
  contentState: ContentState;
}

const EmbedContainer = styled(Box)`
  position: relative;
`;
const EmbedInner = styled(Box)`
  display: inline-block;
  pointer-events: none;
`;

export default function EmbeddedLink(props: EmbeddedLinkProps): JSX.Element {
  const { contentState, block } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height = 'auto', width = '200px', textAlign } = entity.getData();
  const { openDialog } = useDialog();
  return (
    <EmbedContainer
      style={{ textAlign }}
      onMouseDown={e => {
        e.preventDefault();
        openDialog('embed', { contentState, block, entity });
      }}
    >
      <EmbedInner>
        <iframe
          title={src}
          width={width}
          height={height}
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </EmbedInner>
    </EmbedContainer>
  );
}
