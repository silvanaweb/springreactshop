import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const loginAction = useAuth().loginAction;
  // const login = useAuth().login;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Form submitted:', formData);
  //   setError('');
  //   // Send data to the server
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
  //     console.log('Server response:', response);
  //     if (response.status === 200) {
  //       login();
  //       navigate('/login-success');
  //     } else {
  //       const errorText = response.data.error || 'Login failed';
  //       setError(errorText);
  //     }
  //   } catch (error) {
  //     setError('Login failed');
  //   }
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setError('');
    // Send data to the server
    try {
      const response = await loginAction(formData);
      if (response.status === 200) {
        navigate('/login-success');
      } else {
        const errorText = response.data.error || 'Login failed';
        setError(errorText);
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error
        ? <div class="alert alert-danger" role="alert">{error}</div>
        : null
      }

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;