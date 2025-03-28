"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FeedbackProgressMetric = ({ currentFeedbacks, targetFeedbacks }) => {
  // Ensure targetFeedbacks is greater than zero to avoid division errors
  const percentage =
    targetFeedbacks > 0
      ? Math.round((currentFeedbacks / targetFeedbacks) * 100)
      : 0;

  // Dynamic color based on percentage
  const getProgressColor = (percent) => {
    if (percent === 0) return "var(--color-muted-foreground)";
    if (percent < 30) return "var(--color-chart-5)";
    if (percent < 70) return "var(--color-chart-2)";
    return "var(--color-chart-1)";
  };

  const progressColor = getProgressColor(percentage);

  return (
    <div className="bg-card p-6 rounded-xl shadow-md border border-border/40 flex flex-col items-center transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-foreground mb-4 self-start">
        Feedback Progress
      </h3>
      <div className="circular-wrapper w-32 h-32 mb-2">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: progressColor,
            textColor: "var(--color-foreground)",
            trailColor: "var(--color-muted)",
            strokeLinecap: "round",
          })}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-muted-foreground">
        <span className="text-foreground font-bold">{currentFeedbacks}</span>
        <span> / {targetFeedbacks} Feedbacks</span>
      </p>
    </div>
  );
};

export default FeedbackProgressMetric;
