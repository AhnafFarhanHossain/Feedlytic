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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-background/80">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-xl shadow-xl space-y-5 max-w-md w-full border border-border animate-in fade-in-50 duration-300"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Add Feedback</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-muted"
            aria-label="Close form"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Category selection tabs */}
        <div className="flex border border-border rounded-lg overflow-hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                formData.category === cat
                  ? "bg-primary/10 font-medium text-primary border-b-2 border-primary"
                  : "bg-transparent border-b-2 border-transparent hover:bg-muted"
              } flex-1`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-muted-foreground mb-1 ml-1"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="What's your feedback about?"
              value={formData.title}
              onChange={handleChange}
              className="border border-input bg-background p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground mb-1 ml-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="border border-input bg-background p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-muted-foreground mb-1 ml-1"
            >
              Details
            </label>
            <textarea
              id="body"
              name="body"
              placeholder="Please provide more details about your feedback..."
              value={formData.body}
              onChange={handleChange}
              rows="4"
              className="border border-input bg-background p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground mb-1 ml-1"
            >
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="border border-input bg-background p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="border border-border bg-background px-5 py-2.5 rounded-lg hover:bg-muted transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFeedbackForm;
