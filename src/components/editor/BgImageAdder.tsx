import React, { FC, useRef } from 'react';
import classes from '../../scss/bgadder.module.scss';
interface BgImageAdderProps {
  setBgImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const BgImageAdder: FC<BgImageAdderProps> = ({ setBgImage }) => {
  const input_ref = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.bg_adder}>
      <input
        // data-text="Pick Your Image"
        data-text="Pick Image"
        type="file"
        ref={input_ref}
        onInput={(e) => {
          if (input_ref && input_ref.current && input_ref.current.files) {
            const file = input_ref.current.files[0];
            if (!file) {
              return;
            }
            const img_url = URL.createObjectURL(file);
            setBgImage(img_url);
          }
        }}
      />
      <button
        onClick={() => {
          setBgImage('https://source.unsplash.com/random/400x400');
        }}
      >
        Generate Random
      </button>
    </div>
  );
};
