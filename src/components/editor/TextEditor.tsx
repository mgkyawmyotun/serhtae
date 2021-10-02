import React, { FC, useEffect } from 'react';
import classes from '../../scss/texteditor.module.scss';
import { dragabbleText } from '../../utils';

export interface TextEditorType {
  text: string;
  onGetPick?: () => void;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  fontStyle?: string;
  bgColor?: string;
}
export const TextEditor: FC<TextEditorType> = ({
  text,
  onGetPick,
  fontSize,
  color,
  fontWeight,
  fontStyle,
  bgColor,
}) => {
  useEffect(() => {
    dragabbleText('#text_editor');
  }, []);

  return (
    <div
      className={classes.texteditor}
      id="text_editor"
      onClick={() => {
        if (onGetPick) onGetPick();
      }}
    >
      <h1
        style={{
          fontSize: fontSize ? fontSize + 'px' : '20px',
          color: color,
          fontWeight: fontWeight ? fontWeight : 400,
          fontStyle: fontStyle ? fontStyle : 'revert',
          background: bgColor ? bgColor : 'transparent',
        }}
      >
        {text}
      </h1>
    </div>
  );
};
