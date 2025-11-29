"use client";
import { useEffect, useRef, FC } from "react";

import "../../styles/ToastMessage.css";

// timer hook to close Toast Message
function useTimeOut(callbackFunction: () => void): void {
  const savedCallback = useRef<() => void>(callbackFunction);

  useEffect(() => {
    savedCallback.current = callbackFunction;
  }, [callbackFunction]);

  useEffect(() => {
    const functionId = setTimeout(() => savedCallback.current(), 8000);

    return () => clearTimeout(functionId);
  }, []);
}

interface ToastMessageProps {
  message: string;
  close: () => void;
}

// re-usable Toast message
const ToastMessage: FC<ToastMessageProps> = ({ message, close }) => {
  // setting a timer for the toast message if not closed by the user
  useTimeOut(() => {
    // closing toast message after 8sec
    close();
  });

  return (
    <div className='toast'>
      <p>{message}</p>
      <button className='close-button' onClick={close}>
        {"\u274C"}
      </button>
    </div>
  );
};

export default ToastMessage;
