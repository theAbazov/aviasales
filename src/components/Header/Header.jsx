import React from 'react';

import classes from './Header.module.scss';

import logo from '../../assets/img/logo.svg';

function Header() {
  return (
    <header className={classes.header}>
      <a className={classes['header-logo']} href="/">
        <img src={logo} className={classes['header-logo__img']} alt="logo" />
      </a>
    </header>
  );
}

export default Header;
