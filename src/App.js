import { useEffect, useState } from "react";

export default function App() {
  return (
    <div>
      <Header />
      <Timer />
    </div>
  );
}

function Header() {
  return <h1 className="header">Pomodoro Timer</h1>;
}

function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins

  const [isRunning, setIsRunning] = useState(true);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  //const formattedTime = `${minutes}: ${seconds}`;
  useEffect(
    function () {
      let intervalId;

      if (isRunning) {
        intervalId = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      return () => clearInterval(intervalId);
    },
    [isRunning]
  );

  return (
    <div className="timer-container">
      <h1 className="timer-display">{formattedTime}</h1>
      <div className="buttons">
        <button className="btn-start" onClick={() => setIsRunning(true)}>
          Start
        </button>
        <button className="btn-pause" onClick={() => setIsRunning(false)}>
          Pause
        </button>
        <button className="btn-reset" onClick={() => setTimeLeft(25 * 60)}>
          Reset
        </button>
      </div>
    </div>
  );
}
