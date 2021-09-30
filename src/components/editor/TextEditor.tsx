import React, { FC, useEffect } from 'react';
import classes from '../../scss/texteditor.module.scss';
import { dragabbleText } from '../../utils';

export interface TextEditorType {
  text?: string;
}
export const TextEditor: FC<TextEditorType> = ({ text }) => {
  useEffect(() => {
    dragabbleText('#text_editor');
  }, []);
  return (
    <div className={classes.texteditor} id="text_editor">
      {text}
    </div>
  );
};
