import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import browserCookie from 'browser-cookies'

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(browserCookie.get('token') || '');
  
  const loginAction = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, data);
      if (response.status == 200 || response.status == 201){

        setUser(response.data.user);
        setToken(response.data);
        browserCookie.set('token', response.data, {expires: 1})
        localStorage.setItem('token', response.data);
        console.log('silvana cookie', browserCookie.get('jwt')) ;
        return response
      }
      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  }


  const logout = () => {
    setUser(null);
    setToken('');
    browserCookie.erase('token');
    localStorage.removeItem('token');
  };

  const getUserRole = () => {
    if (!token) return null
    const  jwt = jwtDecode(token);
    console.log('silvana getUserRole', jwt)
    return jwt ? jwt.scope : null;
  }

  const isAdmin = () => {
    return getUserRole() === 'ADMIN';
  }

  const getUserId = () => {
    if (!token) return null
    const  jwt = jwtDecode(token);
    return jwt ? jwt.sub : null;
  }
  
  const isAutenticated = () => {
    if (!token) return false
    const  decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      return true;
    }
    setToken('');
    localStorage.removeItem('token');
    return false;
  }

  return (
    <AuthContext.Provider value={{ isAutenticated, token, loginAction, logout, getUserRole, isAdmin, getUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider , useAuth};