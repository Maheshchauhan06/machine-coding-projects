import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

interface ProgressProps {
  value: number; // max value
  triggerAt: number; // when to run onThisTime
  onComplete: () => void;
  onStart: () => void;
  onThisTime: (current: number) => void;
}

const Progressbar: React.FC<ProgressProps> = ({
  value,
  triggerAt,
  onComplete,
  onStart,
  onThisTime,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const timeId = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;

        if (next === 1) onStart();
        if (next === triggerAt) onThisTime(next);
        if (next >= value) {
          clearInterval(timeId);
          onComplete();
          return value;
        }

        return next;
      });
    }, 100);

    return () => clearInterval(timeId);
  }, [value]);

  return (
    <div className="container">
      <div className="label">Progressbar</div>
      <div className="progressbar">
        <div
          className="progress-fill"
          style={{ width: `${(count / value) * 100}%` }}
        />
        <span className="count">{count}%</span>
      </div>
    </div>
  );
};

export default Progressbar;
