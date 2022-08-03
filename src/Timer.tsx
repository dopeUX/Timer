import React, { useState, useEffect, useLayoutEffect } from "react";

const Timer = () => {
  let [seconds, setSeconds] = useState(0);
  let [timer, setTimer] = useState(3);
  let [timerNum, setTimerNum] = useState(3);
  let [minutes, setMinutes] = useState(0);
  const [initialStart, setInitialStart] = useState(true);
  let [timerActive, setActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (minutes === timer) {
      onTimerReset();
    }
  }, [minutes]);

  useLayoutEffect(() => {
    let intervalId: any;
    if (timerActive) {
      if (seconds === 60) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
      intervalId = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      if (minutes === 0 && seconds === 0) {
        setSeconds(0);
      }
    }
  }, [seconds, timerActive]);

  function onTimerStart() {
    setActive(true);
    setInitialStart(false);
  }

  function onTimerPause() {
    setActive(false);
    setIsPaused(true);
  }

  function onTimerContinue() {
    setActive(true);
    setIsPaused(false);
  }

  function onTimerReset() {
    setActive(false);
    setSeconds(0);
    setMinutes(0);
    setInitialStart(true);
  }

  return (
    <div className="timer">
      <h2>timer : {timer} minutes</h2>
      <div className="input-section">
        <input
          type="number"
          placeholder="Set timer"
          // value={timerNum}
          onChange={(e) => {
            setTimerNum(Number(e.currentTarget.value));
          }}
        />
        <button
          onClick={() => {
            setTimer(timerNum);
          }}
        >
          Set
        </button>
      </div>
      <h1>
        {minutes}:{seconds}
      </h1>
      <div className="action-btns">
        <button
          className="btn"
          onClick={() => {
            onTimerStart();
          }}
          disabled={initialStart ? false : true}
        >
          Start
        </button>
        <button
          className="btn"
          onClick={() => {
            onTimerPause();
          }}
          disabled={initialStart || isPaused ? true : false}
        >
          Pause
        </button>
        <button
          className="btn"
          onClick={() => {
            onTimerContinue();
          }}
          disabled={initialStart || !isPaused ? true : false}
        >
          Continue
        </button>
        <button
          className="btn"
          onClick={() => {
            onTimerReset();
          }}
          disabled={initialStart ? true : false}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
