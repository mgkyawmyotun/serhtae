import React, { FC, useRef, useState } from 'react';
import classes from '../../scss/editor.module.scss';
import { Generator } from './Generator';
import { ImageEditor, ImageEditorProps } from './ImageEditor';
import { TextEditor, TextEditorType } from './TextEditor';
import { TextEditorPannel } from './TextEditorPannel';
type PickedItem = { index: number; type: 'img' | 'text' };
export type TextDataType = Pick<
  TextEditorType,
  'text' | 'fontSize' | 'color'
>[];
export const Editor: FC = () => {
  const editor_ref = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = useState<TextDataType>([]);
  const [imageData, setImageData] = useState<ImageEditorProps[]>([]);
  const [pickedItem, setPickedItem] = useState<PickedItem>();
  return (
    <div className={classes.editor}>
      <div className={classes.editor__main}>
        <div className={classes.editor__frame} ref={editor_ref}>
          <img
            src="https://source.unsplash.com/random/200x200"
            alt="Meme Background"
            className={[classes.editor__image__cover, 'target_image'].join(' ')}
          />
          {textData.map((data, index) => (
            <TextEditor
              text={data.text}
              id={index}
              key={index}
              onGetPick={(id) => {
                setPickedItem({ index: id, type: 'text' });
              }}
              fontSize={data.fontSize}
              color={data.color}
            />
          ))}
          {imageData.map((data, index) => (
            <ImageEditor imgPath={data.imgPath} key={index} />
          ))}
        </div>
      </div>

      <div className={classes.editor__pannel}>
        {pickedItem && pickedItem.type === 'text' ? (
          <TextEditorPannel
            textData={textData}
            setTextData={setTextData}
            index={pickedItem.index}
          />
        ) : (
          <div></div>
        )}

        <Generator ref_element={editor_ref} />
      </div>
      <div className={classes.editor__create}>
        <button
          onClick={() => {
            setTextData((data) => [
              ...data,
              { text: 'new ', fontSize: 20, color: '#000000' },
            ]);
          }}
        >
          Add Text
        </button>
        <button
          onClick={() => {
            setImageData((data) => [
              ...data,
              { imgPath: 'https://source.unsplash.com/random/100x100' },
            ]);
          }}
        >
          Add Image
        </button>
      </div>
    </div>
  );
};
