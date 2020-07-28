import { ContentBlock, EditorState } from 'draft-js';
import EmbeddedLink from '../Renderers/EmbeddedLink';
import Image from '../Renderers/Image';
import Link from '../Renderers/Link';

const BLOCK_MAPPINGS: { [key: string]: any } = {
  IMAGE: Image,
  EMBEDDED_LINK: EmbeddedLink,
  LINK: Link,
};

export default function blockRenderFunction(editorState: EditorState) {
  return (block: ContentBlock) => {
    if (block.getType() === 'atomic') {
      const entity = editorState.getCurrentContent()?.getEntity(block.getEntityAt(0));
      if (entity && Object.keys(BLOCK_MAPPINGS).includes(entity.getType())) {
        const Component = BLOCK_MAPPINGS[entity.getType()];
        return {
          component: Component,
          editable: true,
        };
      }
    }

    return undefined;
  };
}
