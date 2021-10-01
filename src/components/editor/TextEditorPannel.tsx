import type { FC } from 'react';
import React from 'react';
import classes from '../../scss/texteditor.module.scss';
import { TextDataType } from './Editor';
interface TextEditorPannelProps {
  textData: TextDataType;
  setTextData: React.Dispatch<React.SetStateAction<TextDataType>>;
  index: number;
}
export const TextEditorPannel: FC<TextEditorPannelProps> = ({
  textData,
  setTextData,
  index,
}) => {
  return (
    <div className={classes.texteditor__pannel}>
      <div className={classes.text_field}>
        <h1>Text</h1>
        <input
          type="text"
          value={textData[index].text}
          onChange={(e) => {
            setTextData((data) => {
              const new_data = [...data];
              new_data[index].text = e.target.value;
              return new_data;
            });
          }}
        />
      </div>
      <div className={classes.font_field}>
        <h1>FontSize</h1>
        <input
          type="number"
          value={textData[index].fontSize}
          min="1"
          max="144"
          onChange={(e) => {
            setTextData((data) => {
              const new_data = [...data];
              new_data[index].fontSize = +e.target.value;
              return new_data;
            });
          }}
        />
      </div>
      <div className={classes.text_color}>
        <h1>Text Color</h1>
        <input
          id="colorPicker"
          type="color"
          value={textData[index].color}
          defaultValue="#0000"
          onChange={(e) => {
            setTextData((data) => {
              const new_data = [...data];
              new_data[index].color = e.target.value;
              return new_data;
            });
          }}
        ></input>
      </div>
      <div className={classes.font_style}>
        <h1>Font Style</h1>
      </div>
    </div>
  );
};
