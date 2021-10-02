import { FC, useEffect } from 'react';
import classes from '../../scss/imgeditor.module.scss';
import { dragAndResizeableImage } from '../../utils';

export interface ImageEditorProps {
  imgPath?: string;
  onGetPicked: () => void;
}
export const ImageEditor: FC<ImageEditorProps> = ({ imgPath, onGetPicked }) => {
  useEffect(() => {
    dragAndResizeableImage('#new_image');
  }, []);
  return (
    <>
      <img
        src={imgPath}
        alt=""
        id="new_image"
        className={classes.image_editor}
        onClick={onGetPicked}
      />
    </>
  );
};
