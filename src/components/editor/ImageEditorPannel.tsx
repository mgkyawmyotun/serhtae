import React, { FC, useRef } from 'react';
import classes from '../../scss/imgeditor.module.scss';
import { ImageDataType } from './Editor';
interface ImageEditorPannelProps {
  setImageData: React.Dispatch<React.SetStateAction<ImageDataType>>;
  index: number;
}
export const ImageEditorPannel: FC<ImageEditorPannelProps> = ({
  setImageData,
  index,
}) => {
  const input_ref = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.image_editor_pannel}>
      <input
        // data-text="Pick Your Image"
        type="file"
        ref={input_ref}
        onInput={(e) => {
          if (input_ref && input_ref.current && input_ref.current.files) {
            const file = input_ref.current.files[0];
            const img_url = URL.createObjectURL(file);
            setImageData((data) => {
              const new_data = [...data];
              new_data[index].imgPath = img_url;
              return new_data;
            });
          }
        }}
      />
    </div>
  );
};
