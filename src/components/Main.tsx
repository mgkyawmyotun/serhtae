import type { FC } from 'react';
import React from 'react';
import classes from '../scss/main.module.scss';
import { Header } from './Header';

interface MainProps {}
export const Main: FC<MainProps> = () => {
  return (
    <div className={classes.main}>
      <Header />
    </div>
  );
};
