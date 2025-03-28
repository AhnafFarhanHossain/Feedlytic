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
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="bg-card shadow-md border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Home</h1>
        </div>
      </header>
      {/* Main content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-8 py-8 bg-card shadow-md rounded-xl border border-border/40">
            {session ? (
              <div className="flex items-center mb-6">
                <div className="mr-4 bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome, {session.user.name}
                </h2>
              </div>
            ) : (
              <div className="flex items-center mb-6">
                <div className="mr-4 bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome, User
                </h2>
              </div>
            )}
            <p className="text-muted-foreground mb-8 pl-1">
              Overview of your activity and key metrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeedbackProgressMetric
                currentFeedbacks={totalFeedbacks}
                targetFeedbacks={targetFeedbacks}
              />
              <SentimentScoreMetric feedbacks={feedbacks} />
              <FeedbackGraphMetric
                weeksData={weeklyFeedbacks}
                chartHeight={chartHeight}
                chartBarWidth={chartBarWidth}
                maxValue={targetFeedbacks}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
