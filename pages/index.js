//Write a code in index.js
import React, { useState, useEffect } from 'react';
const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [time, setTime] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsBreak((prevIsBreak) => {
              if (prevIsBreak) {
                alert('Break time is over! Get back to work.');
                return false;
              } else {
                alert('Work time is over! Take a break.');
                return true;
              }
            });
            return isBreak ? workDuration * 60 : breakDuration * 60;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, isBreak, workDuration, breakDuration]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(workDuration * 60);
  };

  const handleSet = () => {
    if (workDuration <= 0 || breakDuration <= 0) {
      alert('Duration must be greater than 0');
    } else {
      handleReset();
    }
  };

  const handleWorkDurationChange = (event) => {
    const value = parseInt(event.target.value);
    setWorkDuration(value >= 0 ? value : 0);
  };

  const handleBreakDurationChange = (event) => {
    const value = parseInt(event.target.value);
    setBreakDuration(value >= 0 ? value : 0);
  };

  return (
    <div id='main'>
      <div>Work Duration: {workDuration} minutes</div>
      <div>Break Duration: {breakDuration} minutes</div>
      <div>{isBreak ? 'Break Time' : 'Work Time'}</div>
      <div>Clock Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</div>
      <button data-testid='set-btn' onClick={handleSet}>
        Set
      </button>
      <button data-testid='start-btn' onClick={handleStart} disabled={isActive}>
        Start
      </button>
      <button data-testid='stop-btn' onClick={handleStop} disabled={!isActive}>
        Stop
      </button>
      <button data-testid='reset-btn' onClick={handleReset} disabled={!isActive}>
        Reset
      </button>
      <label>
        Work Duration:
        <input
          type='number'
          data-testid='work-duration'
          value={workDuration}
          onChange={handleWorkDurationChange}
        />
      </label>
      <label>
        Break Duration:
        <input
          type='number'
          data-testid='break-duration'
          value={breakDuration}
          onChange={handleBreakDurationChange}
        />
      </label>
    </div>
  );
};


export default App;
