import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
