import { ContentState } from 'draft-js';
import React, { useEffect } from 'react';
import { useDialog } from '../DialogManager';

interface LinkProps {
  entityKey: string;
  contentState: ContentState;
  children: JSX.Element;
}

export default function Link(props: LinkProps): JSX.Element {
  const { entityKey, contentState, children } = props;
  const { url, targetOption, startOpen } = contentState.getEntity(entityKey).getData();
  const { openDialog } = useDialog();

  const open = () => {
    openDialog('link', { entityKey, contentState });
  };

  useEffect(() => {
    if (startOpen) {
      open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a href={url} target={targetOption} onMouseDown={open}>
      {children}
    </a>
  );
}
