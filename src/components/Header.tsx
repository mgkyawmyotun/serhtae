import type { FC } from 'react';
import React from 'react';
import classes from '../scss/header.module.scss';
import Logo from '../svg/logo';
export const Header: FC = () => {
  return (
    <>
      <Logo className={classes.logo} />
    </>
  );
};
