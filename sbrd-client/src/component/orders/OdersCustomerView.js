import React, { useEffect, useState } from 'react';
import { useAuth } from '../account/AuthContext';
import axiosInstance from '../../axiosConfig';
import { Link } from 'react-router-dom';

const OdersCustomerView = () => {
  const { getUserId, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {
      const endpoint = isAdmin() ? '/orders' : `/orders/user/${getUserId()}`;
      const response = await axiosInstance.get(endpoint);
      if (response.status === 302 || response.status === 200) {
        setOrders(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='container mt-5'>
      <h1>Orders View</h1>
      <section>

        <table className="table table-bordered table-hover shadow">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Total</th>
              <th>Customer</th>
              <th>Products</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {orders
              .map((order) => {

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>£ {order.totalPrice}</td>
                    <td>
                      <Link to={`/user-profile/${order.userId}`}>
                        {order.username}
                      </Link>
                    </td>

                    <td>
                      {order?.orderItems?.map((product) => {
                        return (
                          <p key={product.id}>
                            <Link
                              to={`/product-view/${product.productId}`} 
                            >
                              {product.productName} 
                            </Link>
                            <span>
                              - £{product.price} x qty {product.quantity}
                            </span>  
                          </p>
                        )
                      })}
                    </td>

                  </tr>
                )
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OdersCustomerView;