import { FC } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  width: number;
  height: number;
  value: number | string;
  strokeWidth?: number;
};

const ProgressCircle: FC<Props> = ({ width, height, value, strokeWidth }) => {
  return (
    <div style={{ width: width, height: height }}>
      <CircularProgressbar
        value={Number(value)}
        text={`${value}`}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: "#41B06E",
          trailColor: "#222",
          textSize: "40px",
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
};

export default ProgressCircle;