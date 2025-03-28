"use client";
import { useState } from "react";
import AddFeedbackForm from "./AddFeedbackForm";

function AddFeedbackBtn() {
  const [showForm, setShowForm] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  // Called when feedback is successfully added.
  const handleSuccess = () => {
    setNeedsRefresh(true);
  };

  const handleButtonClick = () => {
    if (needsRefresh) {
      location.reload();
    } else {
      setShowForm(true);
    }
  };

  if (showForm) {
    return (
      <AddFeedbackForm
        onClose={() => setShowForm(false)}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <button
      onClick={handleButtonClick}
      className={`p-3 ${
        needsRefresh ? "bg-primary" : "bg-primary"
      } rounded-full text-primary-foreground font-medium cursor-pointer fixed top-5 right-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 z-50`}
      aria-label={needsRefresh ? "Refresh page" : "Add new feedback"}
    >
      {needsRefresh ? (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          <span>Refresh</span>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      )}
    </button>
  );
}

export default AddFeedbackBtn;
