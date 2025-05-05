import React, { useCallback, useRef } from "react";

const UseThrottel = (callback: any, delay: number) => {
  let lastCall = useRef(0);

  const throttleFn = useCallback(
    (...arg: any) => {
      const now = Date.now();

      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...arg);
      }
    },
    [delay]
  );

  return throttleFn;
};

export default UseThrottel;
