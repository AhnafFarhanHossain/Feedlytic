"use client";
import { useMemo } from "react";
import Sentiment from "sentiment";

const SentimentScoreMetric = (props) => {
  const {
    feedbacks,
    positive: posProp,
    negative: negProp,
    neutral: neuProp,
  } = props;

  const { positive, negative, neutral } = useMemo(() => {
    if (feedbacks && feedbacks.length > 0) {
      const sentimentAnalyzer = new Sentiment();
      const totals = feedbacks.reduce(
        (acc, fb) => {
          const text = `${fb.title} ${fb.body}`.toLowerCase();
          const result = sentimentAnalyzer.analyze(text);
          if (result.score > 0) acc.positive += 1;
          else if (result.score < 0) acc.negative += 1;
          else acc.neutral += 1;
          return acc;
        },
        { positive: 0, negative: 0, neutral: 0 }
      );
      return {
        positive: Math.round((totals.positive / feedbacks.length) * 100),
        negative: Math.round((totals.negative / feedbacks.length) * 100),
        neutral: Math.round((totals.neutral / feedbacks.length) * 100),
      };
    }
    return {
      positive: posProp || 0,
      negative: negProp || 0,
      neutral: neuProp || 0,
    };
  }, [feedbacks, posProp, negProp, neuProp]);

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
