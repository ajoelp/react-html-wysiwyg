import { lazy } from 'react';

const DIALOGS: { [key: string]: any } = {
  embed: lazy(() => import('./EmbedDialog')),
  image: lazy(() => import('./ImageDialog')),
  link: lazy(() => import('./LinkDialog')),
};

export default DIALOGS;
