"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FeedbackProgressMetric = ({ currentFeedbacks, targetFeedbacks }) => {
  // Ensure targetFeedbacks is greater than zero to avoid division errors
  const percentage =
    targetFeedbacks > 0
      ? Math.round((currentFeedbacks / targetFeedbacks) * 100)
      : 0;
  const progressColor =
    currentFeedbacks === 0 ? "#9CA3AF" : `rgba(59,130,246,${percentage / 100})`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
      <div className="circular-wrapper">
        <CircularProgressbar
          value={percentage}
          text={`${currentFeedbacks}`}
          styles={buildStyles({
            textSize: "24px",
            pathColor: progressColor,
            textColor: "#4B5563",
            trailColor: "#E5E7EB",
            strokeLinecap: "round",
          })}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">{`${currentFeedbacks} / ${targetFeedbacks} Feedbacks`}</p>
    </div>
  );
};

export default FeedbackProgressMetric;
