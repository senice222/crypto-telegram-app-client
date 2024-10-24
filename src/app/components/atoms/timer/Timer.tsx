import React, { useCallback, useEffect, useState } from "react";
import styles from "./Timer.module.scss";
import Box from "../box/Box";
import Label from "../label/Label";

const timerFrameStyles: React.CSSProperties = {
  width: 36,
  height: 38,
};

export interface ITimer {
  hours: number;
}

export default function Timer({ hours }: ITimer) {
  const calculateTimeLeft = useCallback(() => {
    const endTime = new Date(Date.now() + hours * 60 * 60 * 1000);

    const difference = endTime.getTime() - Date.now();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
      };
    }

    return timeLeft;
  }, [hours]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  return (
    <div className={styles.timer}>
      <div className={styles.timer__frame}>
        <Box
          variant="dark-gray"
          direction="flex-center"
          customStyles={timerFrameStyles}
          borderRadius={8}
        >
          <Label text={timeLeft.days} variant="b-large" color="white" />
        </Box>
        <Label text="day" color="gray" variant="x-small" />
      </div>
      <div className={styles.timer__frame}>
        <Box
          variant="dark-gray"
          direction="flex-center"
          customStyles={timerFrameStyles}
          borderRadius={8}
        >
          <Label text={timeLeft.hours} variant="b-large" color="white" />
        </Box>
        <Label text="hrs" color="gray" variant="x-small" />
      </div>
      <div className={styles.timer__frame}>
        <Box
          variant="dark-gray"
          direction="flex-center"
          customStyles={timerFrameStyles}
          borderRadius={8}
        >
          <Label text={timeLeft.minutes} variant="b-large" color="white" />
        </Box>
        <Label text="min" color="gray" variant="x-small" />
      </div>
    </div>
  );
}
