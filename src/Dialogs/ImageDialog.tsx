import React, { FormEvent, ReactElement, useState } from 'react';
import '@reach/dialog/styles.css';
import TextAlign from '../Controls/TextAlign';
import { useEditorState } from '../EditorStateContext';
import { useUpdateBlockData } from '../utils/useUpdateBlockEntityData';
import { ContentBlock, ContentState, EntityInstance } from 'draft-js';
import JsonObject from '../types/JsonObject';
import formatInputData from '../utils/formatInputData';
import { BaseDialog } from './BaseDialog';

interface ImageDialogProps {
  onClose(): void;

  block: ContentBlock;
  contentState: ContentState;
  entity: EntityInstance;
}

export default function ImageDialog({ onClose, block, contentState, entity }: ImageDialogProps): ReactElement | null {
  const { editorState, onChange } = useEditorState();
  const { updateBlockEntityData } = useUpdateBlockData(block, editorState.getCurrentContent());
  const { height = 'auto', width = '200px', textAlign } = entity.getData();

  const [data, setData] = useState<JsonObject>({
    height,
    width,
    textAlign,
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
    <BaseDialog closeDialog={onClose}>
      <form onSubmit={save}>
        <div>
          <p className="text-sm uppercase text-gray-600 mb-1">Alignment</p>
          <TextAlign
            {...{
              editorState,
              onChange,
              toggleAlignment,
            }}
          />
        </div>
        <div className="flex mt-4">
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
        <button className="bg-gray-300 hover:bg-gray-400 p-2 w-full rounded mt-4" type="submit">
          Apply
        </button>
      </form>
    </BaseDialog>
  );
}
