import EmbedDialog from './EmbedDialog';
import ImageDialog from './ImageDialog';
import LinkDialog from './LinkDialog';

const DIALOGS: { [key: string]: any } = {
  embed: EmbedDialog,
  image: ImageDialog,
  link: LinkDialog,
};

export default DIALOGS;
