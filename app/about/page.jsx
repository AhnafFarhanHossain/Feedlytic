const About = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-white to-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            About Feedlytic
          </h1>
        </div>
      </header>
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg m-4 sm:m-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          About Us
        </h2>
        <p className="text-gray-600 mb-4">
          Feedlytic is a comprehensive platform designed to streamline the
          management of client feedback. Our mission is to provide actionable
          insights that enhance service quality and engagement. This project is
          created by Ahnaf Farhan Hossain, a senior Frontend Developer and
          Designer at TechShabaka, a leading web-dev agency in Bangladesh.
        </p>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          How to use Feedlytic
        </h3>
        <p className="text-gray-600 mb-4">
          Feedlytic uses Supabase as its database and backend to store and edit
          data for the app. The user can connect their SaaS or any desired
          application with this app's Supabase URL -{" "}
          <span className="underline">
            https://zklzsjtbtlmmefzjquzm.supabase.co
          </span>{" "}
          and then collect feedbacks/testimonials via any form or survey. This
          app uses real-time data collection thus the user can easily manage the
          feedbacks instantly after the data has been input into the database
        </p>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Features
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>Real-time feedback collection</li>
          <li>Sentiment analysis</li>
          <li>Customizable reporting</li>
          <li>User-friendly dashboard</li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Contact Us
        </h3>
        <p className="text-gray-600">
          For inquiries, please reach out to us at{" "}
          <a
            href="mailto:ahnaffarhanhossain@gmail.com"
            className="text-blue-500 underline"
          >
            ahnaffarhanhossain@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
