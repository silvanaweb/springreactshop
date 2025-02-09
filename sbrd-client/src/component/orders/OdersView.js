import React, { useEffect } from 'react';
import { useAuth } from '../account/AuthContext';
import axiosInstance from '../../axiosConfig';

const OrdersView = () => {
  const { getUserId, isAdmin } = useAuth();

    useEffect(() => {
      loadOrders();
    }, []);

    const loadOrders = async () => {

      try {
        const endpoint = isAdmin() ? '/orders' : `/orders/user/${getUserId()}`;
        const response = await axiosInstance.get(endpoint);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <div className='container mt-5'>
      <h1>Orders View</h1>
      {getUserId()}
    </div>
  );
};

export default OrdersView;