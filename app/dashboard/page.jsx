"use client";
import { useState, useEffect, useRef } from "react"; // removed useMemo
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
        <div className="min-h-screen w-full bg-background">
          {/* Header */}
          <header className="bg-card shadow-md border-b border-border sticky top-0 z-10">
            <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 relative">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            </div>
          </header>
          {/* Main content */}
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Metrics */}
              <div className="lg:col-span-1 space-y-8">
                <FeedbackProgressMetric
                  currentFeedbacks={totalFeedbacks}
                  targetFeedbacks={targetFeedbacks}
                />
                <FeedbackGraphMetric
                  weeksData={weeklyFeedbacks}
                  chartHeight={chartHeight}
                  chartBarWidth={chartBarWidth}
                  maxValue={targetFeedbacks}
                />
                <SentimentScoreMetric feedbacks={feedbacks} />
              </div>

              {/* Right column - Feedback cards */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    Latest Feedback
                  </h2>
                  <Link
                    href="/feedbacks"
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors"
                  >
                    View all
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 w-4 h-4"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedbacks.slice(0, 8).map((feedback) => (
                    <Link href={`/feedbacks/${feedback.id}`} key={feedback.id}>
                      <div className="relative p-6 bg-card rounded-xl shadow-md border border-border/40 transform hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(feedback.id);
                          }}
                          className="absolute top-3 right-3 p-2 bg-destructive/90 text-white rounded-full hover:bg-destructive transition-colors focus:outline-none focus:ring-2 focus:ring-destructive/50"
                          aria-label="Delete feedback"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                          </svg>
                        </button>

                        <div className="mb-2">
                          <span
                            className={`inline-block ${getBadgeColor(
                              feedback.category
                            )} text-xs px-2.5 py-1 rounded-full font-medium`}
                          >
                            {feedback.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                          {feedback.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {feedback.body}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3.5 h-3.5 text-primary"
                              >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {feedback.name}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {feedback.email}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories section */}
            <div className="mt-12 bg-card rounded-xl shadow-md p-8 border border-border/40">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Feedback Categories
              </h2>
              <FeedbackCategories feedbacks={feedbacks} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
