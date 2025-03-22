"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AddFeedbackForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    body: "",
    name: "",
    category: "Other", // default category (for client use only)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const categories = ["Bug Reports", "Feature Requests", "Other"];

  // Tab click handler
  const selectCategory = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { title, email, body, name, category } = formData;
    const feedbackToInsert = { title, email, body, name };
    const { error, data } = await supabase
      .from("Feedbacks")
      .insert([feedbackToInsert])
      .select(); // ensure returned data
    setLoading(false);
    if (error) {
      setError(error.message);
    } else if (!data || data.length === 0) {
      // added null-check for data
      setError("Insert failed: no data returned.");
    } else {
      const feedbackWithCategory = { ...data[0], category };
      // Store category for this feedback in localStorage
      localStorage.setItem(
        `feedbackCategory_${feedbackWithCategory.id}`,
        category
      );
      if (typeof onSuccess === "function") {
        onSuccess(feedbackWithCategory);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl bg-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl space-y-4 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Feedback</h2>
        {/* Category selection tabs */}
        <div className="flex border mb-4 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              className={`px-4 py-2 -mb-px border-b-2 cursor-pointer rounded-lg ${
                formData.category === cat
                  ? "bg-gray-100 font-bold text-blue-500"
                  : "border-transparent"
              } flex-1`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
          required
        />
        <textarea
          name="body"
          placeholder="Feedback details"
          value={formData.body}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFeedbackForm;
