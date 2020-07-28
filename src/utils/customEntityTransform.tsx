import { RawDraftEntity } from 'draft-js';

export default function customEntityTransform(entity: RawDraftEntity, text: string) {
  if (entity.type === 'LINK') {
    const targetOption = entity.data.targetOption || '_self';
    return `<a href="${entity.data.url}" target="${targetOption}">${text}</a>`;
  }
  if (entity.type === 'IMAGE') {
    const { textAlign } = entity.data;
    if (textAlign && textAlign.length) {
      return `<div style="text-align:${textAlign};"><img src="${entity.data.src}" alt="${entity.data.alt}" style="display: inline-block; height: ${entity.data.height};width: ${entity.data.width}"/></div>`;
    }
  }
  return;
}
