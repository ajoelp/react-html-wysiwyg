import { AtomicBlockUtils, EditorState, Modifier } from 'draft-js';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '../components/IconButton';
import SvgAttachment2 from '../components/icons/Attachment2';
import Popover from '../components/Popover';
import { useEditorState } from '../EditorStateContext';

interface UploadProps {
  onChange(editorState: EditorState): void;
  editorState: EditorState;
}

function isFileImage(file: File): boolean {
  return file && file['type'].split('/')[0] === 'image';
}

export default function Upload(props: UploadProps): JSX.Element {
  const { editorState, onChange } = props;
  const [toggle, setToggle] = useState(false);
  const { config } = useEditorState();
  const [, setError] = useState<string>();

  const appendFile = (url: string, file: File) => {
    const selection = editorState.getSelection();

    const data = {
      url,
      targetOption: '_blank',
    };

    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', data)
      .getLastCreatedEntityKey();

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${file.name}`,
      editorState.getCurrentInlineStyle(),
      entityKey
    );

    const newState = EditorState.push(editorState, contentState, 'insert-characters');

    onChange(newState);
  };

  const appendImage = (src: string) => {
    const data = {
      src,
      width: '100%',
      height: 'auto',
    };

    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', data)
      .getLastCreatedEntityKey();

    const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    onChange(newState);
  };

  const onDrop = useCallback(async (files: File[]) => {
    if (config.onFileUpload && files.length) {
      try {
        const file = files[0];
        const path = await config.onFileUpload(file);
        setToggle(false);
        if (isFileImage(file)) {
          appendImage(path);
        } else {
          appendFile(path, file);
        }
        setToggle(false);
      } catch (e) {
        setError(e.message ?? 'An error occurred.');
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <Popover
      visible={toggle}
      render={() => (
        <div>
          <div {...getRootProps()} className="flex items-center justify-center p-8 border-dashed bg-gray-200">
            <input {...getInputProps()} />
            <div className="flex flex-col">
              Drag or click here
              <button className="mx-3 py-1 rounded text-white bg-indigo-500 mt-2">Upload</button>
            </div>
          </div>
        </div>
      )}
    >
      <IconButton onClick={() => setToggle(!toggle)}>
        <SvgAttachment2 />
      </IconButton>
    </Popover>
  );
}
