import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import classes from "./styles.module.scss";
import logo from "../../assets/img/logo.png";
import { setTickers } from "../../store/tickers/reducer";

export const Header = () => {
  const dispatch = useDispatch();
  const [interval, setInterval] = useState(5000);
  const [changeInterval, setChangeInterval] = useState(5000);

  const onChangeInterval = (e) => {
    setInterval(+e.target.value);
  };

  useEffect(() => {
    const socket = io("http://localhost:4000/");
    socket.on("connect", function () {
      socket.emit("start", changeInterval);
      socket.on("ticker", (msg) => {
        dispatch(setTickers(msg));
      });
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [changeInterval]);

  const onClickInterval = () => {
    setChangeInterval(interval);
  };

  return (
    <div data-testid="header" className={classes.container}>
      <div className={classes.logo}>
        <img src={logo} alt="" />
      </div>
      <div className={classes.links}>
        <button className={classes.link}>USA</button>
        <button className={classes.link}>Europe</button>
        <button className={classes.link}>Currency</button>
        <button className={classes.link}>Cryptocurrency</button>
        <button className={classes.link}>Futures markets</button>
      </div>
      <div className={classes.intervalTime}>
        <input value={interval} onChange={onChangeInterval} type="number" />
        <button
          type="submit"
          onClick={onClickInterval}
          className={classes.intervalBtn}
        >
          Change interval
        </button>
      </div>
    </div>
  );
};
