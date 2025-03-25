"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FeedbackProgressMetric from "@/app/components/FeedbackProgressMetric";
import SentimentScoreMetric from "@/app/components/SentimentScoreMetric";
import FeedbackGraphMetric from "@/app/components/FeedbackGraphMetric";
import useFeedbackStats from "@/app/hooks/useFeedbackStats";
import { supabase } from "./lib/supabaseClient";

const Home = () => {
  const { data: session } = useSession();
  const { totalFeedbacks, weeklyFeedbacks } = useFeedbackStats();
  const targetFeedbacks = 100; // You may compute this or set as needed.

  const [chartHeight, setChartHeight] = useState(224);
  const [chartBarWidth, setChartBarWidth] = useState(40);
  const [feedbacks, setFeedbacks] = useState([]);

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

  useEffect(() => {
    async function fetchFeedbacks() {
      let { data, error } = await supabase
        .from("Feedbacks")
        .select()
        .order("created_at", { ascending: false });
      if (!error) setFeedbacks(data);
      else console.error(error);
    }
    fetchFeedbacks();
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
              <FeedbackProgressMetric
                currentFeedbacks={totalFeedbacks}
                targetFeedbacks={targetFeedbacks}
              />
              <SentimentScoreMetric feedbacks={feedbacks} />
              <FeedbackGraphMetric
                weeksData={weeklyFeedbacks}
                chartHeight={chartHeight}
                chartBarWidth={chartBarWidth}
                maxValue={targetFeedbacks} // new: scale bars based on target feedbacks
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
