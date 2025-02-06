import React from 'react'
import { Link } from 'react-router-dom';

const RegistrationSuccessful = () => {
  return (
    <div>
      <h1>Registration Successful</h1>
      <p>Your account has been created successfully.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default RegistrationSuccessful;