import React from 'react';
import { connect, useSelector } from 'react-redux';

import classes from './ProgressBar.module.scss';

function ProgressBar() {
  const { isLoading } = useSelector((state) => state.AVS);

  return (
    <div
      className={
        isLoading
          ? `${classes['progress-bar']} ${classes['progress-bar--active']}`
          : `${classes['progress-bar']}`
      }
    >
      <div className={classes['progress-bar__content']} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(ProgressBar);
