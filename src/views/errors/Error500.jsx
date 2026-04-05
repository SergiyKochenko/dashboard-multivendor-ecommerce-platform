import React from 'react';
import ErrorPage from './ErrorPage';

const Error500 = () => {
  return (
    <ErrorPage
      statusCode="500"
      title="Something Went Wrong"
      message="The server encountered an unexpected error. Please try again in a moment."
      accentClass="text-[#ff8f8f]"
    />
  );
};

export default Error500;
