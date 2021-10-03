import React, { FC, useRef } from 'react';
import classes from '../../scss/editor.module.scss';
import { ImageDataType, PickedItem, TextDataType } from './Editor';

interface AddPannelProps {
  setTextData: React.Dispatch<React.SetStateAction<TextDataType>>;
  setImageData: React.Dispatch<React.SetStateAction<ImageDataType>>;
  setPickedItem: React.Dispatch<React.SetStateAction<PickedItem | undefined>>;
  disabled: boolean;
}
export const AddPannel: FC<AddPannelProps> = ({
  setTextData,
  setImageData,
  setPickedItem,
  disabled,
}) => {
  const input_ref = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.editor__create}>
      <button
        className={disabled ? classes.disabled : ''}
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
        disabled={disabled}
      >
        Add Text
      </button>
      <input
        className={disabled ? classes.disabled : ''}
        disabled={disabled}
        type="file"
        ref={input_ref}
        onInput={(e) => {
          if (input_ref && input_ref.current && input_ref.current.files) {
            const file = input_ref.current.files[0];
            if (!file) {
              return;
            }
            const img_url = URL.createObjectURL(file);
            input_ref.current.value = '';
            setImageData((data) => {
              const new_data = [...data, { imgPath: img_url }];

              setPickedItem({ index: new_data.length - 1, type: 'text' });
              return new_data;
            });
          }
        }}
      />
    </div>
  );
};
