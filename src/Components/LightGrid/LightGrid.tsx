import React, { useEffect, useRef, useState } from "react";
import "./LightGrid.css";

const LightGrid = () => {
  const [gridCount] = useState<number>(9);
  const [stack, setStack] = useState<number[]>([]);
  const [startRemove, setStartRemove] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (startRemove && stack.length > 0) {
      intervalRef.current = setInterval(() => {
        setStack((prev) => {
          const newStack = [...prev];
          newStack.pop();
          if (newStack.length === 0) {
            setStartRemove(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
          return newStack;
        });
      }, 300);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startRemove]);

  const handleClick = (index: number) => {
    if (!stack.includes(index)) {
      const newStack = [...stack, index];
      setStack(newStack);

      if (newStack.length === gridCount) {
        setStartRemove(true);
      }
    }
  };

  return (
    <div className="box_container">
      {Array.from({ length: gridCount }, (_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`box ${stack.includes(index) ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default LightGrid;
