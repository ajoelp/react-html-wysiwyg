import React from 'react';
import { render } from 'react-dom';
import { Editor } from '../build';

const App = () => {
    const [value, setValue] = React.useState('');

    return (
        <div>
            <Editor value={value} onChange={setValue} editorClassName="prose" />
            <pre>{value}</pre>
        </div>
    );
};

render(<App />, document.getElementById('app'));
