import React from 'react';
import ErrorPage from './ErrorPage';

const Error404 = () => {
  return (
    <ErrorPage
      statusCode="404"
      title="Page Not Found"
      message="The page you are looking for does not exist or may have been moved."
      accentClass="text-[#60d6ff]"
    />
  );
};

export default Error404;
