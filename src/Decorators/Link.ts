import { ContentBlock, ContentState } from 'draft-js';
import Link from '../Renderers/Link';

const linkStrategy = (
  contentBlock: ContentBlock,
  callback: (...args: any) => void,
  contentState: ContentState
): void => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

export default {
  strategy: linkStrategy,
  component: Link,
};
