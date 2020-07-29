import React, { FC, useState } from 'react';
import { Editor } from '../src';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const existingHtml = require('raw-loader!../src/existing-html.html');

export default {
  title: 'ReactHtmlWysiwyg',
  decorators: [(storyFn): JSX.Element => <div className="p-8">{storyFn()}</div>],
};

const editorClassName = 'prose max-w-none';

export const Main: FC = () => {
  const [value, onChange] = useState('');

  const onFileUpload = () =>
    Promise.resolve(
      'https://images.unsplash.com/photo-1595326928396-247ffcf81da8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'
    );

  return <Editor height={600} {...{ value, onChange, editorClassName, onFileUpload }} />;
};

export const ExistingHTML: FC = () => {
  const [value, onChange] = useState(existingHtml.default);
  return <Editor height={600} {...{ value, onChange, editorClassName }} />;
};
