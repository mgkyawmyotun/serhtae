import { FC, useEffect } from 'react';
import classes from '../../scss/imgeditor.module.scss';
import { dragAndResizeableImage } from '../../utils';

export interface ImageEditorProps {
  imgPath?: string;
}
export const ImageEditor: FC<ImageEditorProps> = ({ imgPath }) => {
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
      />
    </>
  );
};
