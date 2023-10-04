import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {Doughnut, Line } from 'react-chartjs-2';
import { getAdminProduct } from '../../redux/actions/productAction';
import {useDispatch,useSelector} from 'react-redux'
import { getAllOrders } from '../../redux/actions/OrderAction';
import { getAllUsers } from '../../redux/actions/UserAction';

const Dashboard = () => {  


  const dispatch=useDispatch()

  const {products}=useSelector((state)=>state.products)

  const {orders}=useSelector((state)=>state.Allorder)

  const {users}=useSelector((state)=>state.allUser)
  
  let outOfStoke=0

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStoke += 1;
      }
    });

    useEffect(() => {
      dispatch(getAdminProduct())
      dispatch (getAllOrders())
      dispatch(getAllUsers())
    }, [dispatch]);

let totalAmount=0
orders && orders.forEach(item=>{
  totalAmount+=item.totalPrice
})
  
  
  const lineState = {
    labels: ['Initial Amount ','Amount Earned '],
    datasets: [
      {
        label: 'Total Amount',
        backgroundColor: 'tomato',
        hoverBackgroundColor: 'rgb(197, 72, 49)',
        data: [outOfStoke, products.length-outOfStoke],
      },
    ],
  };

  const doughnutState ={
    labels:["Out of stoke","InStoke"],
    datasets:[{
        backgroundColor:["#00A6B4","#680084"],
        hoverBackgroundColor:["tomato"],
        data:[0,totalAmount]
    }]
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardcontainer">
        <Typography component="h1" variant="h5">
          Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>

            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>

            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState}/>
        </div>
        <div className="doughnutChart">
<Doughnut data={doughnutState}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



