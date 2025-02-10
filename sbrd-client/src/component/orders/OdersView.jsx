import React, { useEffect, useState } from 'react';
import { useAuth } from '../account/AuthContext';
import axiosInstance from '../../axiosConfig';
import { Link } from 'react-router-dom';
import mysqlDateToJs from '../../utilities/mysqlDatetoJs';
import { set } from 'browser-cookies';

const OrdersView = () => {
  const { getUserId, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState('');
  const [brand, setBrand] = useState(0);

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setBrand(0)

    try {
      const response = await axiosInstance.get(`/orders/date/${selectedDate}`);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadAllOrders = async () => {
    setDate('');
    setBrand(0);
    loadOrders();
  };

  const handleBrandChange = async (e) => {
    const brandId = e.target.value;
    setBrand(brandId);
    setDate('');
    if (brandId === '0') {
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
        <div className="container mt-4">
          <div className="row">
            <div className="col col-sm-12 col-md-4">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="brand">
                  Filter by Brand
                </label>
                <select
                  className="form-control col-sm-6"
                  name="brand"
                  id="brand"
                  required
                  value={brand}
                  onChange={(e) => handleBrandChange(e)}
                >
                  <option value="0">- Select Brand -</option>
                  <option value="1">NiKe</option>
                  <option value="2">Adidas</option>
                  <option value="3">Puma</option>
                  <option value="4">Reebook</option>
                  <option value="5">Fila</option>
                </select>
              </div>
            </div>
            <div className="col col-sm-12 col-md-5">
              <div className="input-group ">
                <label className="input-group-text" htmlFor="date">
                  Filter by Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="col col-sm-12 col-md-3 sb-3">
              <div className="input-group ">
                <button className="btn btn-primary" onClick={loadAllOrders}>View all Orders</button>
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
              <th>Create On</th>
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
                    <td>{mysqlDateToJs(order.orderDate)}</td>

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