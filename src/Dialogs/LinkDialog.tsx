import React, { FormEvent, ReactElement, useState } from 'react';
import '@reach/dialog/styles.css';
import { useUpdateEntityData } from '../utils/useUpdateBlockEntityData';
import { ContentState, EntityInstance } from 'draft-js';
import JsonObject from '../types/JsonObject';
import formatInputData from '../utils/formatInputData';
import BaseDialog from './BaseDialog';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

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
    <BaseDialog onClose={onClose}>
      <form onSubmit={save}>
        <div>
          <p>URL</p>
          <InputField type="text" value={data.url} onChange={setValue('url')} />
          <p>Target</p>
          <InputField type="text" value={data.targetOption} onChange={setValue('targetOption')} />
        </div>
        <SubmitButton type="submit">Apply</SubmitButton>
      </form>
    </BaseDialog>
  );
}
