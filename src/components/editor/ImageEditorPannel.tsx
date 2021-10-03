import React, { FC, useRef } from 'react';
import classes from '../../scss/imgeditor.module.scss';
import { ImageDataType } from './Editor';
interface ImageEditorPannelProps {
  setImageData: React.Dispatch<React.SetStateAction<ImageDataType>>;
  index: number;
  setIsBack: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ImageEditorPannel: FC<ImageEditorPannelProps> = ({
  setImageData,
  index,
  setIsBack,
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

            if (!file) {
              return;
            }

            const img_url = URL.createObjectURL(file);
            setImageData((data) => {
              const new_data = [...data];
              new_data[index].imgPath = img_url;
              return new_data;
            });
          }
        }}
      />
      <div>
        <button
          onClick={() => {
            setIsBack(true);
          }}
        >
          Move To Back
        </button>
        <button
          onClick={() => {
            setIsBack(false);
          }}
        >
          Move To Front
        </button>
      </div>
      <button
        onClick={() => {
          setImageData((data) => {
            const new_data = data.filter((da, idx) => idx !== index);
            console.log(index);
            console.log(new_data);
            return new_data;
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};
