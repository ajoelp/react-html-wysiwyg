import { AtomicBlockUtils, EditorState, Modifier } from 'draft-js';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '../components/IconButton';
import SvgAttachment2 from '../components/icons/Attachment2';
import { useEditorState } from '../EditorStateContext';
import { Dropdown, DropdownMenu, DropdownTrigger } from '../components/Dropdown';
import { Box } from '../components/Layout';
import styled from 'styled-components';
import getThemeValue from '../utils/getThemeValue';

interface UploadProps {
  onChange(editorState: EditorState): void;

  editorState: EditorState;
}

function isFileImage(file: File): boolean {
  return file && file['type'].split('/')[0] === 'image';
}

const UploadContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 2em;
  border: 3px dashed ${getThemeValue('colors.borderColor')};
  text-align: center;
  cursor: pointer;
  &:hover {
    ${getThemeValue('colors.borderColor')}
  }
`;

export default function Upload(props: UploadProps): JSX.Element {
  const { editorState, onChange } = props;
  const [toggle, setToggle] = useState(false);
  const { config } = useEditorState();
  const [, setError] = useState<string>();

  const appendFile = useCallback(
    (url: string, file: File) => {
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
    },
    [editorState, onChange]
  );

  const appendImage = useCallback(
    (src: string) => {
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
    },
    [editorState, onChange]
  );

  const onDrop = useCallback(
    async (files: File[]) => {
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
    },
    [appendFile, appendImage, config]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <Dropdown>
      <DropdownTrigger noArrow={true}>
        <IconButton onClick={() => setToggle(!toggle)}>
          <SvgAttachment2 />
        </IconButton>
      </DropdownTrigger>
      <DropdownMenu>
        <Box p="1em">
          <UploadContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <Box display="flex" flexDirection="column">
              Drag or click here
            </Box>
          </UploadContainer>
        </Box>
      </DropdownMenu>
    </Dropdown>
  );
}
