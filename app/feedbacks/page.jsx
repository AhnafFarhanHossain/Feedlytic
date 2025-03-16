"use client";
import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      let { data, error } = await supabase.from("Feedbacks").select();
      if (error) console.error(error);
      else setFeedbacks(data);
    }
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800">Feedbacks</h1>
        </div>
      </header>

      {/* Feedback items */}
      <div className="max-w-[1200px] mx-auto mt-10 p-4 grid grid-cols-4 gap-6">
        {feedbacks.map((feedback) => (
          <Link href={`/feedbacks/${feedback.id}`} key={feedback.id}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg transition duration-200 cursor-pointer hover:shadow-md">
              <h1 className="text-xl font-bold text-gray-900">
                {feedback.title}
              </h1>
              <h3 className="text-sm text-gray-600 mb-2">{feedback.email}</h3>
              <p className="text-lg text-gray-800 mb-4">{feedback.body}</p>
              <h3 className="text-sm text-gray-400">
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
