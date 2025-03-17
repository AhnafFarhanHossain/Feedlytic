"use client";
const SentimentScoreMetric = ({ positive, negative, neutral }) => {
  const renderBar = (label, percent, barColor) => (
    <div className="mb-4">
      <p className="text-gray-600 mb-1">
        {label} - {percent}%
      </p>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Sentiment Score
      </h3>
      {renderBar("Positive Feedbacks", positive, "bg-green-500")}
      {renderBar("Neutral Comments", neutral, "bg-yellow-500")}
      {renderBar("Negative Feedbacks", negative, "bg-red-500")}
    </div>
  );
};

export default SentimentScoreMetric;
