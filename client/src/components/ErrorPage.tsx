import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen w-screen ">
      <div className="h-full flex justify-center items-center">
        <div className="p-3">
          <h1 className="text-3xl sm:text-6xl font-extrabold font-mono">
            404 NOT FOUND
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
