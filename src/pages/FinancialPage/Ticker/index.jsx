import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeTicker } from "../../../store/tickers/reducer";
import arrowDown from "../../../assets/img/down.png";
import arrowUp from "../../../assets/img/up.png";
import { getDate, getTime } from "../utils";
import classes from "./classes.module.scss";

export const Ticker = ({
  ticker,
  price,
  change_percent,
  last_trade_time,
  change,
  invisibleRows,
  setInvisibleRows,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  const onClick = (e) => {
    setSelectedRows((prev) => {
      if (e.target.checked) {
        return prev.filter((index) => index !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  };

  const cancelTicker = (e) => {
    setInvisibleRows((prev) => {
      if (invisibleRows.includes(e.target.value)) {
        return prev.filter((index) => index !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
    dispatch(removeTicker(e.target.value));
  };
  const isIncludedRow = (id) => {
    return selectedRows.includes(id) ? true : false;
  };

  return (
    <div
      className={`${classes.ticker} ${
        isIncludedRow(ticker) ? classes.disabled : ""
      }`}
      value={ticker}
    >
      <input
        checked={!isIncludedRow(ticker)}
        type="checkbox"
        value={ticker}
        onChange={onClick}
      />
      <div className={classes.nameTicker}>
        {isIncludedRow(ticker) ? "--" : ticker}
      </div>
      <div className={classes.indicators}>
        <div className={classes.indicator}>
          {isIncludedRow(ticker) ? "--" : price}
        </div>
        <div
          className={`${classes.indicator} ${
            change.startsWith("-") ? classes.negative : classes.positive
          }`}
        >
          {isIncludedRow(ticker) ? "--" : change}
          {!isIncludedRow(ticker) && (
            <img
              src={change.startsWith("-") ? arrowDown : arrowUp}
              alt="arrow"
            />
          )}
        </div>
        <div
          className={`${classes.indicator} ${
            change_percent.startsWith("-")
              ? classes.negativeProcent
              : classes.positiveProcent
          }`}
        >
          {isIncludedRow(ticker) ? "--" : `${change_percent}%`}
        </div>
        <div className={`${classes.indicator} ${classes.time}`}>
          <div>{getDate(last_trade_time)}</div>
          <div>{getTime(last_trade_time)}</div>
        </div>
        <button
          className={classes.cancel}
          value={ticker}
          onClick={cancelTicker}
          disabled={isIncludedRow(ticker)}
        >
          x
        </button>
      </div>
    </div>
  );
};
