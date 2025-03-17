"use client";
const FeedbackGraphMetric = ({
  weeksData = [],
  chartHeight = 224,
  chartBarWidth = 40,
  height,
}) => {
  // Ensure each week value is a valid number
  const validWeeksData = weeksData.map((week) => ({
    ...week,
    value: Number(week.value) || 0,
  }));
  // Use at least 1 as the denominator to avoid division by zero
  const maxVal = Math.max(...validWeeksData.map((week) => week.value), 1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Feedback Graph
      </h3>
      <div
        className="flex justify-around items-end"
        style={{ height: `${chartHeight}px` }}
      >
        {validWeeksData.map((week, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`${week.color} rounded-t`}
              style={{
                width: `${chartBarWidth}px`,
                height: `${(week.value / maxVal) * chartHeight}px`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-2">
        {validWeeksData.map((week, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xs text-gray-600">{week.label}</span>
            <span className="text-xs text-gray-500">{week.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackGraphMetric;
