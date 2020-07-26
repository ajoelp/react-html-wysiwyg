import { ContentState } from 'draft-js';
import React from 'react';
import { useUpdateEntityData } from '../utils/useUpdateBlockEntityData';
import Popover from '../components/Popover';

interface LinkProps {
    entityKey: string;
    contentState: ContentState;
    children: JSX.Element;
}

export default function Link(props: LinkProps): JSX.Element {
    const { entityKey, contentState, children } = props;
    const { updateBlockEntityData } = useUpdateEntityData(entityKey, contentState);
    const { url, targetOption, startOpen } = contentState.getEntity(entityKey).getData();

    return (
        <Popover
            visible={startOpen}
            render={() => (
                <div>
                    <p className="text-sm uppercase text-gray-600 mb-1">URL</p>
                    <input
                        type="text"
                        className="border px-3 py-1 w-full rounded"
                        value={url}
                        onChange={updateBlockEntityData('url')}
                    />
                    <p className="text-sm uppercase text-gray-600 mb-1">Target</p>
                    <input
                        type="text"
                        className="border px-3 py-1 w-full rounded"
                        value={targetOption}
                        onChange={updateBlockEntityData('targetOption')}
                    />
                </div>
            )}
        >
            <a href={url} target={targetOption}>
                {children}
            </a>
        </Popover>
    );
}
