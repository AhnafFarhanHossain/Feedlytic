"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Label render function for larger devices remains unchanged
const renderLabel = ({ name, percent }) =>
  `${name} ${(percent * 100).toFixed(0)}%`;

// Custom label for small devices (text inside the slice)
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "10px" }} // smaller font size added
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function FeedbackCategories({ feedbacks = [] }) {
  // now accepts feedbacks prop

  // Group feedbacks by the explicit category:
  const categoryCounts = feedbacks.reduce((acc, fb) => {
    const cat = fb.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const total = feedbacks.length;
  const data = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    value: total ? Math.round((count / total) * 100) : 0,
  }));

  // Extended colors for dynamic categories (family of blue shades)
  const COLORS = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  // Set responsive outerRadius for the chart and check device size
  const [outerRadius, setOuterRadius] = useState(120);
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const updateSize = () => {
      setIsSmall(window.innerWidth < 640);
      setOuterRadius(window.innerWidth < 640 ? 80 : 120);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="max-w-full mx-auto h-96 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            fill="#8884d8"
            label={isSmall ? false : renderLabel} // disable labels on small devices
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
