"use client";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  const currentFeedbacks = 0;
  const targetFeedbacks = 0;
  const percentage = targetFeedbacks
    ? Math.round((currentFeedbacks / targetFeedbacks) * 100)
    : 0;
  const progressColor =
    currentFeedbacks === 0
      ? "#9CA3AF"
      : `rgba(59, 130, 246, ${percentage / 100})`;

  const [chartHeight, setChartHeight] = useState(224);
  const [chartBarWidth, setChartBarWidth] = useState(40); // default ~ w-10 (2.5rem ~ 40px)

  useEffect(() => {
    const updateChartDimensions = () => {
      if (window.innerWidth < 640) {
        setChartHeight(150);
        setChartBarWidth(30);
      } else {
        setChartHeight(224);
        setChartBarWidth(40);
      }
    };
    updateChartDimensions();
    window.addEventListener("resize", updateChartDimensions);
    return () => window.removeEventListener("resize", updateChartDimensions);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800">Home</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-8 py-6 bg-white shadow-sm rounded-lg">
            {session ? (
              <h2 className="text-2xl font-medium text-gray-700 mb-4">
                Welcome, {session.user.name}
              </h2>
            ) : (
              <h2 className="text-2xl font-medium text-gray-700 mb-4">
                Welcome, User
              </h2>
            )}
            <p className="text-gray-500 mb-8">
              Overview of your activity and key metrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Metric 1: Circular Progress for Feedbacks */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-center items-center">
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
              {/* Metric 2: Minimal Progress Bar Chart for Sentiment Score */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Sentiment Score
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-1">Neutral Comments - 0%</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gray-400 h-3 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      Positive Feedbacks - 0%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gray-500 h-3 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      Negative Feedbacks - 0%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gray-600 h-3 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Metric 3: Vertical Bar Chart - Muted Colors */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Feedback Graph
                </h3>
                {(() => {
                  const weeks = [
                    { label: "3 Weeks Ago", value: 0, color: "bg-gray-400" },
                    { label: "2 Weeks Ago", value: 0, color: "bg-gray-500" },
                    { label: "Last Week", value: 0, color: "bg-gray-600" },
                    { label: "This Week", value: 0, color: "bg-gray-700" },
                  ];
                  const maxVal = Math.max(...weeks.map((w) => w.value));
                  return (
                    <div>
                      <div
                        className="flex justify-around items-end"
                        style={{ height: `${chartHeight}px` }}
                      >
                        {weeks.map((week, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`${week.color} rounded-t`}
                              style={{
                                width: `${chartBarWidth}px`,
                                height: `${
                                  (week.value / maxVal) * chartHeight
                                }px`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-around mt-2">
                        {weeks.map((week, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <span className="text-xs text-gray-600">
                              {week.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {week.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </main>
      <style jsx global>{`
        .CircularProgressbar-text {
          font-weight: 600;
          fill: #4b5563;
        }
        .circular-wrapper {
          width: 150px;
          height: 150px;
        }
        @media (max-width: 640px) {
          .circular-wrapper {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
