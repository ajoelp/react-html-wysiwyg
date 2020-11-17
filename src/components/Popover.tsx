import React, { useState } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import { useSpring, motion } from 'framer-motion';
import { useEditorState } from '../EditorStateContext';
import { useClickOutside } from '../utils/useClickOutside';
import { Instance } from 'tippy.js';

type PopoverProps = Omit<TippyProps, 'onMount' | 'onHide'>;

export default function Popover({ children, render, visible: startOpen }: PopoverProps): JSX.Element {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);
  const { setReadOnly } = useEditorState();
  const [visible, setVisible] = useState(startOpen);
  const { ref: editorRef } = useEditorState();
  const ref = useClickOutside<HTMLDivElement>(() => {
    setVisible(false);
  });

  function onMount() {
    setReadOnly(true);
    scale.set(1);
    opacity.set(1);
  }

  function onHide({ unmount }: Instance<any>) {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });
    scale.set(initialScale);
    opacity.set(0);
    setReadOnly(false);
  }

  function toggleVisible(event: React.MouseEvent) {
    event.preventDefault();
    setVisible(!visible);
  }

  return (
    <Tippy
      visible={visible}
      animation={true}
      appendTo={editorRef?.current || document.body}
      onMount={onMount}
      onHide={onHide}
      interactive={true}
      interactiveBorder={20}
      delay={100}
      render={(...args) => (
        <motion.div
          ref={ref}
          style={{ opacity, scale, minWidth: 300 }}
          className="shadow-xl border bg-white p-4 rounded w-full text-gray-800"
          {...args[0]}
        >
          {render && render(...args)}
        </motion.div>
      )}
    >
      <div style={{ display: 'inline' }} onClick={toggleVisible}>
        <div style={{ display: 'inline', pointerEvents: 'none' }}>{children}</div>
      </div>
    </Tippy>
  );
}
