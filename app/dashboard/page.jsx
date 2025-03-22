"use client";
import { useState, useEffect, useRef, useMemo } from "react"; // added useMemo
import FeedbackGraphMetric from "../components/FeedbackGraphMetric";
import FeedbackProgressMetric from "../components/FeedbackProgressMetric";
import SentimentScoreMetric from "../components/SentimentScoreMetric";
import FeedbackCategories from "../components/FeedbackCategories";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import useFeedbackStats from "@/app/hooks/useFeedbackStats";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sentiment from "sentiment"; // added sentiment analysis library import

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const toastShown = useRef(false);

  // Add helper to choose badge color based on category
  const getBadgeColor = (category) => {
    switch (category) {
      case "Bug Reports":
        return "bg-red-100 text-red-800";
      case "Feature Requests":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Use hook for dynamic metrics
  const { totalFeedbacks, weeklyFeedbacks } = useFeedbackStats();
  const targetFeedbacks = 100; // Adjust as needed

  const [chartHeight, setChartHeight] = useState(224);
  const [chartBarWidth, setChartBarWidth] = useState(40);
  const [feedbacks, setFeedbacks] = useState([]);

  // Compute actual sentiment metrics from feedbacks using AI sentiment analyzer
  const sentimentMetrics = useMemo(() => {
    const sentimentAnalyzer = new Sentiment();
    return feedbacks.reduce(
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
  }, [feedbacks]);

  useEffect(() => {
    if (status === "unauthenticated" && !toastShown.current) {
      router.push("/authentication");
      toast.error("You need to sign in to access this page", {
        className: "toast-custom",
      });
      toastShown.current = true;
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchFeedbacks() {
      let { data, error } = await supabase
        .from("Feedbacks")
        .select()
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else {
        // Merge stored category (if any) ensuring trimming for consistency
        const mergedData = data.map((fb) => {
          const stored = localStorage.getItem(`feedbackCategory_${fb.id}`);
          const category = stored
            ? stored.trim()
            : fb.category
            ? fb.category.trim()
            : "Other";
          return { ...fb, category };
        });
        setFeedbacks(mergedData);
      }
    }
    fetchFeedbacks();
  }, []);

  // New function to delete a feedback
  const handleDelete = async (id) => {
    const { error } = await supabase.from("Feedbacks").delete().match({ id });
    if (error) {
      console.error(error);
    } else {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
    }
  };

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
    <>
      {status === "authenticated" ? (
        <div className="min-h-screen w-full bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
              <h1 className="text-3xl font-semibold text-gray-800">
                Dashboard
              </h1>
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
                  maxValue={targetFeedbacks}
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 max-w-full">
              <div>
                <h1 className="mb-4 text-2xl text-gray-700 font-bold">
                  Latest Posts
                </h1>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 max-w-[1000px]">
                {" "}
                {/* changed container classes */}
                {feedbacks.slice(0, 6).map((feedback) => (
                  <Link href={`/feedbacks/${feedback.id}`} key={feedback.id}>
                    <div className="relative p-6 bg-white rounded-lg shadow-sm transform hover:shadow-md transition duration-200 cursor-pointer break-inside-avoid mb-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(feedback.id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-400 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                        </svg>
                      </button>
                      <h1 className="text-xl font-bold text-gray-900">
                        {feedback.title}
                      </h1>
                      <h3 className="text-sm text-gray-600 mb-2">
                        {feedback.email}
                      </h3>
                      {/* Updated: Dynamic Category Badge */}
                      <span
                        className={`inline-block ${getBadgeColor(
                          feedback.category
                        )} text-xs px-2 py-1 rounded-full mb-2`}
                      >
                        {feedback.category}
                      </span>
                      {/* ---------------------------------- */}
                      <p className="text-lg text-gray-800 mb-4">
                        {feedback.body}
                      </p>
                      <h3 className="text-sm text-gray-500 italic">
                        Feedback from - {feedback.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              {/* updated metrics container for the pie chart with AI-based sentiment analysis */}
              <div className="w-full">
                <SentimentScoreMetric
                  positive={
                    feedbacks.length
                      ? Math.round(
                          (sentimentMetrics.positive / feedbacks.length) * 100
                        )
                      : 0
                  }
                  negative={
                    feedbacks.length
                      ? Math.round(
                          (sentimentMetrics.negative / feedbacks.length) * 100
                        )
                      : 0
                  }
                  neutral={
                    feedbacks.length
                      ? Math.round(
                          (sentimentMetrics.neutral / feedbacks.length) * 100
                        )
                      : 0
                  }
                />
              </div>
            </div>
          </div>
          <div className="max-w-full mx-8 bg-white rounded-lg shadow p-6 border-gray-100">
            <h1 className="text-xl font-bold text-gray-700">
              Common Categories of Feedbacks
            </h1>
            <FeedbackCategories feedbacks={feedbacks} />{" "}
            {/* Pass dynamic feedbacks */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
