import React from 'react';
import { render } from 'react-dom';
import { Editor } from '../build';

const App = () => {
    return <Editor />;
};

render(<App />, document.getElementById('app'));
