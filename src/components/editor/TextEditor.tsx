import React, { FC, useEffect } from 'react';
import classes from '../../scss/texteditor.module.scss';
import { dragabbleText } from '../../utils';

export interface TextEditorType {
  text: string;
  onGetPick?: (id: number) => void;
  id: number;
  fontSize?: number;
  color?: string;
}
export const TextEditor: FC<TextEditorType> = ({
  text,
  onGetPick,
  id,
  fontSize,
  color,
}) => {
  useEffect(() => {
    dragabbleText('#text_editor');
  }, []);

  return (
    <div
      className={classes.texteditor}
      id="text_editor"
      onClick={() => {
        if (onGetPick) onGetPick(id);
      }}
      style={{ fontSize: fontSize && fontSize + 'px', color: color }}
    >
      {text}
    </div>
  );
};
