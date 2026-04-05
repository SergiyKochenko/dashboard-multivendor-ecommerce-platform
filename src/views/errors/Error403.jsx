import React from 'react';
import ErrorPage from './ErrorPage';

const Error403 = () => {
  return (
    <ErrorPage
      statusCode="403"
      title="Access Denied"
      message="You do not have permission to view this page. Please sign in with an authorized account or contact your administrator."
      accentClass="text-[#ffcb57]"
    />
  );
};

export default Error403;
