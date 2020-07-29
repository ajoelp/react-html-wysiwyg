import React, { ComponentProps, createContext, useCallback, useState, Suspense, useContext } from 'react';
import Dialogs from '../Dialogs';

type DialogKeys = keyof typeof Dialogs;
type DialogProps = ComponentProps<typeof Dialogs[keyof typeof Dialogs]>;

interface DialogContext {
  // eslint-disable-next-line no-restricted-globals
  openDialog(name: DialogKeys, data: Partial<ComponentProps<typeof Dialogs[typeof name]>>): void;
}

const DialogContext = createContext<DialogContext>({
  openDialog() {},
});

interface DialogManagerProps {
  children: JSX.Element;
}

export default function DialogManager(props: DialogManagerProps) {
  const [dialog, setDialog] = useState<DialogKeys | undefined>();
  const [dialogProps, setDialogProps] = useState<Partial<DialogProps> | undefined>();

  const openDialog = useCallback((name: DialogKeys, data: Partial<ComponentProps<typeof Dialogs[typeof name]>>) => {
    setDialog(name);
    setDialogProps(data);
  }, []);

  const CurrentDialog = dialog ? Dialogs[dialog] : null;

  const mutatedProps = {
    ...dialogProps,
    onClose: () => {
      setDialog(undefined);
      setDialogProps(undefined);
    },
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {props.children}
      <Suspense fallback={<div />}>{CurrentDialog ? <CurrentDialog {...mutatedProps} /> : null}</Suspense>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used inside a DialogManager');
  }
  return context;
}
