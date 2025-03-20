"use client";
import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    async function fetchFeedbacks() {
      let { data, error } = await supabase.from("Feedbacks").select();
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
    if (status === "unauthenticated" && !toastShown.current) {
      router.push("/authentication");
      toast.error("You need to sign in to access this page", {
        className: "toast-custom",
      });
      toastShown.current = true;
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800">Feedbacks</h1>
        </div>
      </header>

      {/* Masonry layout for Feedback items */}
      <div
        className="max-w-[1200px] w-full mx-auto mt-10 p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4"
        style={{ columnGap: "1.5rem" }}
      >
        {feedbacks.map((feedback) => (
          <Link href={`/feedbacks/${feedback.id}`} key={feedback.id}>
            <div className="relative p-6 bg-white rounded-lg shadow-sm cursor-pointer transition-shadow duration-200 hover:shadow-md mb-6 break-inside-avoid">
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
              <h3 className="text-sm text-gray-600 mb-2">{feedback.email}</h3>
              <p className="text-lg text-gray-800 mb-4">{feedback.body}</p>
              <h3 className="text-sm text-gray-500 italic">
                Feedback from - {feedback.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default page;
