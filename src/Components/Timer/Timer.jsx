import { useEffect, useState } from "react";

function Timer(props) {
  const examDuration = 5 * 60;
  const [timeRemaining, setTimeRemaining] = useState(examDuration);
  const [finished, setFinished] = useState(false);

  // Function to format the time remaining in MM:SS format
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  // get timer from localStorage on component mount
  useEffect(() => {
    const savedTime = localStorage.getItem("Timer");
    if (savedTime) {
      setTimeRemaining(parseInt(savedTime, 10));
    }
  }, []);

  // add the time remaining to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("Timer", timeRemaining);
  }, [timeRemaining]);

  // Update the finished state in the parent component
  useEffect(() => {
    props.setFinished(finished);
  }, [finished]);

  // Start the timer when the component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary fw-bold text-white p-3 rounded-circle">
      {formatTime(timeRemaining)}
    </div>
  );
}

export default Timer;
