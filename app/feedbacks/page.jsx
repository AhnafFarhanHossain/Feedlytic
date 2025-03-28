"use client";
import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Add category badge helper
const getBadgeColor = (category) => {
  switch (category) {
    case "Bug Reports":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "Feature Requests":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300";
  }
};

const page = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    async function fetchFeedbacks() {
      let { data, error } = await supabase.from("Feedbacks").select();
      if (error) console.error(error);
      else {
        // Merge stored category for consistency
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
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-card-foreground">
            Feedbacks
          </h1>
        </div>
      </header>

      {/* Masonry layout for Feedback items */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <Link href={`/feedbacks/${feedback.id}`} key={feedback.id}>
              <div className="group relative p-6 bg-card rounded-xl border border-border/40 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:border-border hover:bg-card/80">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(feedback.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-destructive/80 text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive"
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
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-card-foreground leading-tight">
                    {feedback.title}
                  </h2>
                  <span
                    className={`inline-flex items-center ${getBadgeColor(
                      feedback.category
                    )} text-xs px-2.5 py-1 rounded-full font-medium`}
                  >
                    {feedback.category}
                  </span>
                  <p className="text-sm text-card-foreground line-clamp-3">
                    {feedback.body}
                  </p>
                  <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-2">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                      </svg>
                      {feedback.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                      </svg>
                      {new Date(feedback.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default page;
