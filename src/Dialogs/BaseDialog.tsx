import React from 'react';
import styled from 'styled-components';
import getThemeValue from '../utils/getThemeValue';
import { DialogContent, DialogOverlay } from '@reach/dialog';

const DialogWrapper = styled.div`
  ${getThemeValue('base')}
  * {
    box-sizing: border-box;
  }
`;

interface BaseDialogProps {
  onClose(): any;
  children: React.ReactNode;
}

export default function BaseDialog(props: BaseDialogProps) {
  return (
    <DialogOverlay isOpen={true} onDismiss={props.onClose} style={{ zIndex: 9000 }}>
      <DialogContent style={{ width: '100%', maxWidth: 400, zIndex: 9000 }}>
        <DialogWrapper>{props.children}</DialogWrapper>
      </DialogContent>
    </DialogOverlay>
  );
}
