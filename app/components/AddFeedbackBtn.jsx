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
      className="p-3 bg-blue-500 rounded text-white font-bold cursor-pointer absolute top-4 right-8"
    >
      {needsRefresh ? (
        "Refresh"
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
      )}
    </button>
  );
}

export default AddFeedbackBtn;
