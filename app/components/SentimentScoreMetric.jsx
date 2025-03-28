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

  const renderBar = (label, percent, barColor, iconPath) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className={`p-1.5 rounded mr-2 ${barColor.bg}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-4 h-4 ${barColor.text}`}
            >
              {iconPath}
            </svg>
          </div>
          <p className="text-foreground font-medium">{label}</p>
        </div>
        <span className="text-foreground font-bold">{percent}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${barColor.fill}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-card p-6 rounded-xl shadow-md border border-border/40 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-foreground mb-5">
        Sentiment Analysis
      </h3>
      {renderBar(
        "Positive Feedbacks",
        positive,
        { bg: "bg-green-100", text: "text-green-600", fill: "bg-green-500" },
        <path d="M17 7l-10 10M7 7l10 10M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 9v.01M12 13v2" />
      )}
      {renderBar(
        "Neutral Comments",
        neutral,
        { bg: "bg-yellow-100", text: "text-yellow-600", fill: "bg-yellow-500" },
        <path d="M8 12h8M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 9v.01M12 13v2" />
      )}
      {renderBar(
        "Negative Feedbacks",
        negative,
        { bg: "bg-red-100", text: "text-red-600", fill: "bg-red-500" },
        <path d="M9.5 15.5l5-5M9.5 10.5l5 5M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 9v.01M12 13v2" />
      )}
    </div>
  );
};

export default SentimentScoreMetric;
