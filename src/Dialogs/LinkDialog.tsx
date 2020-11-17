import React, { FormEvent, ReactElement, useState } from 'react';
import '@reach/dialog/styles.css';
import { useUpdateEntityData } from '../utils/useUpdateBlockEntityData';
import { ContentState, EntityInstance } from 'draft-js';
import JsonObject from '../types/JsonObject';
import formatInputData from '../utils/formatInputData';
import { BaseDialog } from './BaseDialog';

interface LinkDialogProps {
  onClose(): void;

  entityKey: string;
  contentState: ContentState;
  entity: EntityInstance;
}

export default function LinkDialog({ onClose, entityKey, contentState }: LinkDialogProps): ReactElement | null {
  const { updateBlockEntityData } = useUpdateEntityData(entityKey, contentState);
  const { url, targetOption } = contentState.getEntity(entityKey).getData();

  const [data, setData] = useState<JsonObject>({
    url,
    targetOption,
  });

  const setValue = (key: string) => (value: any) => setData({ ...data, [key]: formatInputData(value) });

  const save = (e: FormEvent) => {
    e.preventDefault();
    updateBlockEntityData(data);
  };

  if (!contentState) {
    return null;
  }

  return (
    <BaseDialog closeDialog={onClose}>
      <form onSubmit={save}>
        <div>
          <p className="text-sm uppercase text-gray-600 mb-1">URL</p>
          <input type="text" className="border px-3 py-1 w-full rounded" value={data.url} onChange={setValue('url')} />
          <p className="text-sm uppercase text-gray-600 mb-1">Target</p>
          <input
            type="text"
            className="border px-3 py-1 w-full rounded"
            value={data.targetOption}
            onChange={setValue('targetOption')}
          />
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 p-2 w-full rounded mt-4" type="submit">
          Apply
        </button>
      </form>
    </BaseDialog>
  );
}
