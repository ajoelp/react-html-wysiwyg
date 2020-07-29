import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor } from '../.';
import '../dist/react-html-wysiwyg.cjs.development.css';

const App = () => {
  const [value, setValue] = React.useState('');

  const fileUpload = (file: File) => {
    return Promise.resolve('https://images.unsplash.com/photo-1593642632505-1f965e8426e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3625&q=80')
  };

  return (
    <div>
      <Editor height={600} value={value} onChange={setValue} onFileUpload={fileUpload} />
      <Editor value={value} onChange={setValue} />
      {value}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
