"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AddFeedbackForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    body: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    const { title, email, body, name } = formData;
    const { error } = await supabase
      .from("Feedbacks")
      .insert([{ title, email, body, name }]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      if (typeof onSuccess === "function") {
        onSuccess();
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFeedbackForm;
