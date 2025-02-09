import React, { useEffect, useState } from 'react';
import { useAuth } from '../account/AuthContext';
import axiosInstance from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const OrdersView = () => {
  const { getUserId, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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

  const handleSelectChange = async (e) => {
    const brandId = e.target.value;
    if (brandId === '0') {
      loadOrders();
      return;
    }
    try {
      const response = await axiosInstance.get(`/orders/brand/${brandId}`);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h1>Orders View</h1>
      <section>
        <div className="container">
          <div className="row">
            <div className="col col-sm-12 col-md-4">
            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="brand">
                Filter by Brand
              </label>
              <select
                className="form-control col-sm-6"
                name="brand"
                id="brand"
                required
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="0">-- All Orders --</option>
                <option value="1">NiKe</option>
                <option value="2">Adidas</option>
                <option value="3">Puma</option>
                <option value="4">Reebook</option>
                <option value="5">Fila</option>
              </select>
					</div>

            </div>
          </div>
        </div>
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

export default OrdersView;