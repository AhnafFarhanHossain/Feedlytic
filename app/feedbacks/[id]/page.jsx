"use client";
import { useState, useEffect, use } from "react";
import { supabase } from "@/app/lib/supabaseClient";

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
        .select()
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setFeedback(data);
    }

    fetchFeedback();
  }, [id]);

  if (!feedback)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-b-4 rounded-full animate-spin"></div>
          <span className="text-gray-700 font-medium">
            Loading, please wait...
          </span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Feedback: {resolvedParams.id}
          </h1>
        </div>
      </header>
      {/* Detail Section */}
      <main className="max-w-4xl mx-auto my-8 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">{feedback.title}</h2>
        <p className="mb-4 text-gray-700">{feedback.body}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>By: {feedback.name}</span>
          <span>
            Date:{" "}
            {new Date(feedback.created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </main>
    </div>
  );
}
