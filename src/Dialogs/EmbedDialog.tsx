import React, { FormEvent, ReactElement, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import TextAlign from '../Controls/TextAlign';
import { useEditorState } from '../EditorStateContext';
import { useUpdateBlockData } from '../utils/useUpdateBlockEntityData';
import { ContentBlock, ContentState, EntityInstance } from 'draft-js';
import JsonObject from '../types/JsonObject';
import formatInputData from '../utils/formatInputData';

interface EmbedDialogProps {
  onClose(): void;

  block: ContentBlock;
  contentState: ContentState;
  entity: EntityInstance;
}

export default function EmbedDialog({ onClose, block, contentState, entity }: EmbedDialogProps): ReactElement | null {
  const { editorState, onChange } = useEditorState();
  const { updateBlockEntityData } = useUpdateBlockData(block, editorState.getCurrentContent());
  const { height = 'auto', width = '200px', textAlign, src } = entity.getData();

  const [data, setData] = useState<JsonObject>({
    height,
    width,
    textAlign,
    src,
  });

  const setValue = (key: string) => (value: any) => setData({ ...data, [key]: formatInputData(value) });

  const save = (e: FormEvent) => {
    e.preventDefault();
    updateBlockEntityData(data);
  };

  const toggleAlignment = (value: string) => {
    updateBlockEntityData({ textAlign: value });
  };

  if (!block || !contentState) {
    return null;
  }

  return (
    <DialogOverlay isOpen={true} onDismiss={onClose} style={{ zIndex: 9000 }}>
      <DialogContent style={{ width: '100%', maxWidth: 400, zIndex: 9000 }}>
        <form onSubmit={save}>
          <div>
            <p className="text-sm uppercase text-gray-600 mb-1">Alignment</p>
            <TextAlign {...{ editorState, onChange, toggleAlignment }} />
          </div>
          <div className="flex mb-2">
            <div className="w-1/2 mr-2">
              <p className="text-sm uppercase text-gray-600 mb-1">Width</p>
              <input
                type="text"
                className="border px-3 py-1 w-full rounded"
                value={data.width}
                onChange={setValue('width')}
              />
            </div>
            <div className="w-1/2">
              <p className="text-sm uppercase text-gray-600 mb-1">Height</p>
              <input
                type="text"
                className="border px-3 py-1 w-full rounded"
                value={data.height}
                onChange={setValue('height')}
              />
            </div>
          </div>
          <div>
            <p className="text-sm uppercase text-gray-600 mb-1">Source</p>
            <input
              type="text"
              className="border px-3 py-1 w-full rounded"
              value={data.src}
              onChange={setValue('src')}
            />
          </div>
          <button className="bg-gray-300 hover:bg-gray-400 p-2 w-full rounded mt-4" type="submit">
            Apply
          </button>
        </form>
      </DialogContent>
    </DialogOverlay>
  );
}
