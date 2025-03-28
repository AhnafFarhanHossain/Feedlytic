"use client";
import { useState, useEffect, use } from "react";
import { supabase } from "@/app/lib/supabaseClient";

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

export default function page({ params }) {
  // Unwrap params using React.use() as required
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchFeedback() {
      const { data, error } = await supabase
        .from("Feedbacks")
        .select() // Ensure category is fetched if part of the record
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setFeedback(data);
    }

    fetchFeedback();
  }, [id]);

  if (!feedback)
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-primary border-b-4 rounded-full animate-spin"></div>
          <span className="text-foreground font-medium">
            Loading, please wait...
          </span>
        </div>
      </div>
    );

  // Merge stored category from localStorage if available
  const stored = localStorage.getItem(`feedbackCategory_${feedback.id}`);
  const category = stored
    ? stored.trim()
    : feedback.category
    ? feedback.category.trim()
    : "Other";

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-card-foreground">
            Feedback: {resolvedParams.id}
          </h1>
        </div>
      </header>
      {/* Wrap feedback card with extra spacing */}
      <div className="m-4">
        <main className="max-w-4xl w-full mx-auto my-8 p-6 sm:p-8 bg-card border border-border/40 shadow-sm rounded-lg transition-all duration-300 hover:shadow-md hover:border-border hover:bg-card/80">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground leading-tight">
              {feedback.title}
            </h2>
            <span
              className={`inline-flex items-center ${getBadgeColor(
                category
              )} text-xs px-2.5 py-1 rounded-full font-medium`}
            >
              {category}
            </span>
            <p className="text-base text-card-foreground leading-relaxed">{feedback.body}</p>
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
        </main>
      </div>
    </div>
  );
}
