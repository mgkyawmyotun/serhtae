import type { FC } from 'react';
import React from 'react';
import { Editor } from './components/Editor';
import { Header } from './components/Header';
import classes from './scss/main.module.scss';

interface MainProps {}
export const Main: FC<MainProps> = () => {
  return (
    <div className={classes.main}>
      <Header />
      <Editor />
    </div>
  );
};
