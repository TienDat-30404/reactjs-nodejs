import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <img
         style = {{ width : '50%', height : '78vh' }} src = "https://i.imgur.com/qIufhof.png"
        alt="Not Found"
        className="w-1/2 max-w-sm mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
