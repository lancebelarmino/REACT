import React, { useContext, useRef, useEffect } from 'react';
import EtherContext from '../../context/EtherContext.js';
import Countdown from 'react-countdown';
import useStyles from './Timer.styles.js';

const Timer = () => {
  const test = useRef();
  const { walletData } = useContext(EtherContext);
  const { classes } = useStyles();

  useEffect(() => {
    if (walletData.time) {
      test.current.api.start();
    }
  }, [walletData.time]);

  return (
    <Countdown
      ref={test}
      date={Date.now() + walletData.time}
      renderer={({ days, hours, minutes, seconds }) => {
        return (
          <span className={classes.timer}>
            {days}:{hours}:{minutes}:{seconds}
          </span>
        );
      }}
    />
  );
};

export default Timer;
