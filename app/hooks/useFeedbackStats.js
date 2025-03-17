import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

const useFeedbackStats = () => {
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [weeklyFeedbacks, setWeeklyFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbackStats() {
      const { data, error } = await supabase.from("Feedbacks").select("created_at");
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        // Total count for all feedbacks
        setTotalFeedbacks(data.length);

        // Calculate weekly counts. For simplicity, we split into three groups:
        // "This Week": created within last 7 days
        // "Last Week": between 7 and 14 days ago
        // "2 Weeks Ago": between 14 and 21 days ago
        const now = new Date();
        const weekCounts = { "This Week": 0, "Last Week": 0, "2 Weeks Ago": 0 };
        data.forEach((fb) => {
          const created = new Date(fb.created_at);
          const diffWeeks = (now - created) / (1000 * 60 * 60 * 24 * 7);
          if (diffWeeks < 1) weekCounts["This Week"]++;
          else if (diffWeeks < 2) weekCounts["Last Week"]++;
          else if (diffWeeks < 3) weekCounts["2 Weeks Ago"]++;
        });
        const weeksArray = Object.entries(weekCounts).map(([label, value]) => ({
          label,
          value,
          color:
            label === "This Week"
              ? "bg-green-400"
              : label === "Last Week"
              ? "bg-blue-400"
              : "bg-gray-400",
        }));
        setWeeklyFeedbacks(weeksArray);
      }
    }
    fetchFeedbackStats();
    const interval = setInterval(fetchFeedbackStats, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return { totalFeedbacks, weeklyFeedbacks };
};

export default useFeedbackStats;
