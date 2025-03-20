"use client";
import { useState, useEffect, useRef } from "react";
import FeedbackGraphMetric from "../components/FeedbackGraphMetric";
import FeedbackProgressMetric from "../components/FeedbackProgressMetric";
import SentimentScoreMetric from "../components/SentimentScoreMetric";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import AddFeedbackBtn from "../components/AddFeedbackBtn";
import useFeedbackStats from "@/app/hooks/useFeedbackStats";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const toastShown = useRef(false);

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
    if (status === "unauthenticated" && !toastShown.current) {
      router.push("/authentication");
      toast.error("You need to sign in to access this page", {
        className: "toast-custom",
      });
      toastShown.current = true;
    }
  }, [status, router]);

  // Don't render dashboard until session is authenticated
  if (status !== "authenticated") {
    return null;
  }

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
                <div className="relative p-6 bg-white rounded-lg shadow-sm transform hover:shadow-md transition duration-200 cursor-pointer">
                  {/* Delete button styled and repositioned */}
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
                  <p className="text-lg text-gray-800 mb-4">{feedback.body}</p>
                  <h3 className="text-sm text-gray-500 italic">
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
