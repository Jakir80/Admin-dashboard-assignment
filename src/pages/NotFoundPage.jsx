import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {

  return (
    <div>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Not Found


      </div>
      <div className="text-center mt-4">
        <Link to="/"><button className="bg-blue-400 p-4">Back to Home</button></Link>
      </div>
    </div>
  );
};

export default NotFoundPage;