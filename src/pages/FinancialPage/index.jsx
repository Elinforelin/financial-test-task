import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { setTickers } from "../../store/tickers/reducer";
import { selectTickers } from "../../store/tickers/selector";
import classes from "./classes.module.scss";

import { Ticker } from "./Ticker";

export const FinancialPage = () => {
  const [invisibleRows, setInvisibleRows] = useState([]);
  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers);

  useEffect(() => {
    try {
      const socket = io("http://localhost:4000/");
      socket.emit("start");
      socket.on("ticker", (msg) => {
        dispatch(setTickers(msg));
      });
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line
  }, []);

  const addTicker = (e) => {
    setInvisibleRows((prev) => {
      if (invisibleRows.includes(e.target.value)) {
        return prev.filter((index) => index !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  };

  return (
    <div data-testid="financial-page" className={classes.container}>
      {!!invisibleRows.length && (
        <select onChange={addTicker} name="" id="">
          <option value="default" hidden defaultChecked>
            Add ticker
          </option>
          {invisibleRows.map((ticker) => (
            <option value={ticker} key={ticker}>
              {ticker}
            </option>
          ))}
        </select>
      )}

      <div className={classes.table}>
        {tickers.map((ticker) =>
          invisibleRows.includes(ticker.ticker) ? null : (
            <Ticker
              key={ticker.ticker}
              price={ticker.price}
              ticker={ticker.ticker}
              change_percent={ticker.change_percent}
              last_trade_time={ticker.last_trade_time}
              change={ticker.change}
              invisibleRows={invisibleRows}
              setInvisibleRows={setInvisibleRows}
            />
          )
        )}
      </div>
    </div>
  );
};
