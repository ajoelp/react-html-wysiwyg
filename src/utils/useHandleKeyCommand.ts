import { DraftEditorCommand, EditorState, RichUtils } from 'draft-js';
import { useEditorState } from '../EditorStateContext';

export default function useHandleKeyCommand() {
    const { onChange } = useEditorState();

    const handleKeyCommand = (command: DraftEditorCommand, state: EditorState) => {
        const newState = RichUtils.handleKeyCommand(state, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    return handleKeyCommand;
}
