//Write a code in index.js
'use client';
import React, { useState, useEffect } from 'react';

const App = () => {
  const defaultWorkDuration = 25;
  const defaultBreakDuration = 5;

  const [workDuration, setWorkDuration] = useState(defaultWorkDuration);
  const [breakDuration, setBreakDuration] = useState(defaultBreakDuration);
  const [timer, setTimer] = useState(null);
  const [isWorking, setIsWorking] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    document.title = `${isWorking ? 'Work' : 'Break'} - ${formatTime()}`;
  }, [timer, isWorking]);

  const formatTime = () => {
    const currentDuration = isWorking ? workDuration : breakDuration;
    return `${Math.floor(currentDuration / 60)}:${(currentDuration % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!isTimerRunning && (workDuration > 0 || breakDuration > 0)) {
      setTimer(
        setInterval(() => {
          if (isWorking && workDuration > 0) {
            setWorkDuration((prev) => prev - 1);
          } else if (!isWorking && breakDuration > 0) {
            setBreakDuration((prev) => prev - 1);
          } else {
            setIsWorking((prev) => !prev);
            if (isWorking) {
              setWorkDuration(defaultWorkDuration);
            } else {
              setBreakDuration(defaultBreakDuration);
            }
          }
        }, 1000)
      );
      setIsTimerRunning(true);
    }
  };

  const stopTimer = () => {
    clearInterval(timer);
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timer);
    setIsTimerRunning(false);
    setWorkDuration(defaultWorkDuration);
    setBreakDuration(defaultBreakDuration);
    setIsWorking(true);
  };

  const handleWorkDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setWorkDuration(value >= 0 ? value : 0);
  };

  const handleBreakDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setBreakDuration(value >= 0 ? value : 0);
  };

  return (
    <div id="main">
      <div>
        <label>Work Duration:</label>
        <input
          type="number"
          value={workDuration}
          onChange={handleWorkDurationChange}
          data-testid="work-duration"
          disabled={isTimerRunning}
        />
      </div>
      <div>
        <label>Break Duration:</label>
        <input
          type="number"
          value={breakDuration}
          onChange={handleBreakDurationChange}
          data-testid="break-duration"
          disabled={isTimerRunning}
        />
      </div>
      <div>
        <p>{isWorking ? 'Work Time' : 'Break Time'}: {formatTime()}</p>
      </div>
      <button onClick={startTimer} disabled={isTimerRunning} data-testid="start-btn">
        Start
      </button>
      <button onClick={stopTimer} disabled={!isTimerRunning} data-testid="stop-btn">
        Stop
      </button>
      <button onClick={resetTimer} data-testid="reset-btn">
        Reset
      </button>
    </div>
  );
};

export default App;
