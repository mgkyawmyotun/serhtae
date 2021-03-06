import React, { FC, useRef, useState } from 'react';
import classes from '../../scss/editor.module.scss';
import { AddPannel } from './AddPannel';
import { BgImageAdder } from './BgImageAdder';
import { Generator } from './Generator';
import { ImageEditor, ImageEditorProps } from './ImageEditor';
import { ImageEditorPannel } from './ImageEditorPannel';
import { TextEditor, TextEditorType } from './TextEditor';
import { TextEditorPannel } from './TextEditorPannel';
export type PickedItem = { index: number; type: 'img' | 'text' };
export type TextDataType = Pick<
  TextEditorType,
  'text' | 'fontSize' | 'color' | 'fontWeight' | 'fontStyle' | 'bgColor'
>[];
export type ImageDataType = Pick<ImageEditorProps, 'imgPath'>[];
export const Editor: FC = () => {
  const editor_ref = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = useState<TextDataType>([]);
  const [imageData, setImageData] = useState<ImageDataType>([]);
  const [pickedItem, setPickedItem] = useState<PickedItem>();
  const [bgImage, setBgImage] = useState<string>();
  const [isBack, setIsBack] = useState<boolean>(false);
  return (
    <div className={classes.editor}>
      <div className={classes.editor__main}>
        <div
          className={`${classes.editor__frame} ${
            !bgImage ? classes.with_bg : ''
          }`}
          ref={editor_ref}
        >
          {!bgImage && <BgImageAdder setBgImage={setBgImage} />}
          {bgImage && (
            <img
              src={bgImage}
              alt="Meme Background"
              className={[classes.editor__image__cover, 'target_image'].join(
                ' '
              )}
            />
          )}
          {textData.map((data, index) => (
            <TextEditor
              text={data.text}
              key={index}
              onGetPick={() => {
                setPickedItem({ index, type: 'text' });
              }}
              fontSize={data.fontSize}
              color={data.color}
              fontWeight={data.fontWeight}
              fontStyle={data.fontStyle}
              bgColor={data.bgColor}
            />
          ))}
          {imageData.map((data, index) => (
            <ImageEditor
              imgPath={data.imgPath}
              key={index}
              onGetPicked={() => {
                setPickedItem({ index, type: 'img' });
              }}
              isBack={isBack}
            />
          ))}
        </div>
      </div>

      <div className={classes.editor__pannel}>
        {pickedItem && pickedItem.type === 'text'
          ? textData.length > 0 && (
              <TextEditorPannel
                textData={textData}
                setTextData={setTextData}
                index={pickedItem.index}
              />
            )
          : pickedItem &&
            imageData.length > 0 && (
              <ImageEditorPannel
                setImageData={setImageData}
                index={pickedItem.index}
                setIsBack={setIsBack}
              />
            )}

        <Generator ref_element={editor_ref} />
      </div>
      <AddPannel
        setImageData={setImageData}
        setTextData={setTextData}
        setPickedItem={setPickedItem}
        disabled={!bgImage}
      />
    </div>
  );
};
