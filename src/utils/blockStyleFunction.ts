import { ContentBlock } from 'draft-js';

export default function blockStyleFunction(block: ContentBlock) {
    const alignment = block.getData().get('text-align');
    if (alignment) {
        return `editor-text-${alignment}`;
    }
    return '';
}
