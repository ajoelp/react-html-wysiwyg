import React, { FormEvent, ReactElement, useState } from 'react';
import '@reach/dialog/styles.css';
import TextAlign from '../Controls/TextAlign';
import { useEditorState } from '../EditorStateContext';
import { useUpdateBlockData } from '../utils/useUpdateBlockEntityData';
import { ContentBlock, ContentState, EntityInstance } from 'draft-js';
import JsonObject from '../types/JsonObject';
import formatInputData from '../utils/formatInputData';
import BaseDialog from './BaseDialog';
import { Box } from '../components/Layout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

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
    <BaseDialog onClose={onClose}>
      <form onSubmit={save}>
        <div>
          <p>Alignment</p>
          <TextAlign {...{ editorState, onChange, toggleAlignment }} />
        </div>
        <Box display="flex" mb="1em">
          <Box width="50%" mr="1em">
            <p>Width</p>
            <InputField type="text" value={data.width} onChange={setValue('width')} />
          </Box>
          <Box width="50%">
            <p>Height</p>
            <InputField type="text" value={data.height} onChange={setValue('height')} />
          </Box>
        </Box>
        <div>
          <p>Source</p>
          <InputField type="text" value={data.src} onChange={setValue('src')} />
        </div>
        <SubmitButton type="submit">Apply</SubmitButton>
      </form>
    </BaseDialog>
  );
}
