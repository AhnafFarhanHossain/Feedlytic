"use client";
import React, { useState, useEffect } from "react";
import FeedbackGraphMetric from "../components/FeedbackGraphMetric";
import FeedbackProgressMetric from "../components/FeedbackProgressMetric";
import SentimentScoreMetric from "../components/SentimentScoreMetric";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import AddFeedbackBtn from "../components/AddFeedbackBtn";
import useFeedbackStats from "@/app/hooks/useFeedbackStats";

const Dashboard = () => {
  // Use hook for dynamic metrics
  const { totalFeedbacks, weeklyFeedbacks } = useFeedbackStats();
  const targetFeedbacks = 100; // Adjust as needed
  const positive = 70,
    negative = 15,
    neutral = 15;

  const [chartHeight, setChartHeight] = useState(224);
  const [chartBarWidth, setChartBarWidth] = useState(40);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      let { data, error } = await supabase
        .from("Feedbacks")
        .select()
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else setFeedbacks(data);
    }
    fetchFeedbacks();
  }, []);

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
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        </div>
      </header>
      {/* Changed flex container: stack vertically on small devices */}
      <div className="my-0 mx-auto flex flex-col md:flex-row gap-2 p-4">
        <div className="flex flex-col gap-2 items-start justify-center m-5 max-w-full md:max-w-fit">
          <FeedbackProgressMetric
            currentFeedbacks={totalFeedbacks}
            targetFeedbacks={targetFeedbacks}
          />
          <div className="w-full">
            <FeedbackGraphMetric
              weeksData={weeklyFeedbacks}
              chartHeight={chartHeight}
              chartBarWidth={chartBarWidth}
              maxValue={targetFeedbacks} // new: scale bars based on target feedbacks
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 max-w-full">
          <div>
            <h1 className="mb-4 text-2xl text-gray-700 font-bold">
              Latest Posts
            </h1>
          </div>
          {/* Updated grid classes for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[1000px]">
            {feedbacks.slice(0, 6).map((feedback) => (
              <Link href={`/feedbacks/${feedback.id}`} key={feedback.id}>
                <div className="p-6 bg-white border border-gray-200 rounded-lg transition duration-200 cursor-pointer hover:shadow-md">
                  <h1 className="text-xl font-bold text-gray-900">
                    {feedback.title}
                  </h1>
                  <h3 className="text-sm text-gray-600 mb-2">
                    {feedback.email}
                  </h3>
                  <p className="text-lg text-gray-800 mb-4">{feedback.body}</p>
                  <h3 className="text-sm text-gray-400">
                    Feedback from - {feedback.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          {/* Moved SentimentScoreMetric below posts */}
          <div>
            <SentimentScoreMetric
              positive={positive}
              negative={negative}
              neutral={neutral}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
