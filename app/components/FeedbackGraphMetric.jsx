"use client";
const FeedbackGraphMetric = ({
  weeksData = [],
  chartHeight = 224,
  chartBarWidth = 40,
  maxValue, // prop for scaling
  height,
}) => {
  // Ensure each week value is a valid number
  const validWeeksData = weeksData.map((week) => ({
    ...week,
    value: Number(week.value) || 0,
  }));
  const computedMax = Math.max(...validWeeksData.map((week) => week.value), 1);
  const maxVal = maxValue || computedMax; // use maxValue if provided

  // Enhanced colors for the bars
  const getEnhancedColor = (originalColor) => {
    if (originalColor.includes("green")) return "bg-chart-1";
    if (originalColor.includes("blue")) return "bg-chart-2";
    return "bg-chart-3";
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md border border-border/40 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-foreground mb-5">
        Feedback Trends
      </h3>
      <div
        className="flex justify-around items-end"
        style={{ height: `${chartHeight}px` }}
      >
        {validWeeksData.map((week, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div
              className={`${getEnhancedColor(
                week.color
              )} rounded-t-lg transition-all duration-300 group-hover:opacity-90`}
              style={{
                width: `${chartBarWidth}px`,
                height: `${Math.max(
                  (week.value / maxVal) * chartHeight,
                  15
                )}px`,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-popover text-popover-foreground rounded-md px-2 py-1 text-xs absolute -top-8 left-1/2 transform -translate-x-1/2 shadow-md">
                {week.value} feedbacks
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-4">
        {validWeeksData.map((week, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-sm font-medium text-foreground">
              {week.label}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {week.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackGraphMetric;
