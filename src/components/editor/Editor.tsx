import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import React, { FC, useRef, useState } from 'react';
import classes from '../../scss/editor.module.scss';
import { ImageEditor, ImageEditorProps } from './ImageEditor';
import { TextEditor, TextEditorType } from './TextEditor';
export const Editor: FC = () => {
  const editor_ref = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = useState<TextEditorType[]>([
    { text: 'hello wolrd' },
  ]);
  const [imageData, setImageData] = useState<ImageEditorProps[]>([]);
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
            <TextEditor text={data.text} key={index} />
          ))}
          {imageData.map((data, index) => (
            <ImageEditor imgPath={data.imgPath} key={index} />
          ))}
        </div>
      </div>

      <div className={classes.editor_pannel}>
        <button
          onClick={() => {
            if (editor_ref && editor_ref.current) {
              domtoimage.toBlob(editor_ref.current).then((value) => {
                saveAs(value);
              });
            }
          }}
        >
          Generate
        </button>
      </div>
      <div className={classes.editor__create}>
        <button
          onClick={() => {
            setTextData((data) => [...data, { text: 'new ' }]);
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
