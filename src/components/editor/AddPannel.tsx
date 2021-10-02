import React, { FC, useRef } from 'react';
import classes from '../../scss/editor.module.scss';
import { ImageDataType, PickedItem, TextDataType } from './Editor';

interface AddPannelProps {
  setTextData: React.Dispatch<React.SetStateAction<TextDataType>>;
  setImageData: React.Dispatch<React.SetStateAction<ImageDataType>>;
  setPickedItem: React.Dispatch<React.SetStateAction<PickedItem | undefined>>;
}
export const AddPannel: FC<AddPannelProps> = ({
  setTextData,
  setImageData,
  setPickedItem,
}) => {
  const input_ref = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.editor__create}>
      <button
        onClick={() => {
          setTextData((data) => {
            const new_data = [
              ...data,
              { text: 'text is here', fontSize: 20, color: '#000000' },
            ];
            setPickedItem({ index: new_data.length - 1, type: 'text' });
            return new_data;
          });
        }}
      >
        Add Text
      </button>
      <input
        // data-text="Pick Your Image"
        type="file"
        ref={input_ref}
        onInput={(e) => {
          if (input_ref && input_ref.current && input_ref.current.files) {
            const file = input_ref.current.files[0];
            const img_url = URL.createObjectURL(file);
            setImageData((data) => [...data, { imgPath: img_url }]);
          }
        }}
      />
    </div>
  );
};
