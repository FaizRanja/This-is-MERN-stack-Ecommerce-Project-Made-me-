import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import {logout} from '../../../redux/actions/UserAction'
 import { useDispatch ,useSelector} from "react-redux";
 import './UserOption.css'
 import Backdrop from "@material-ui/core/Backdrop";

import React, { Fragment } from "react";
const UserOptions = ({ user }) => {

const {cartItems}=useSelector(state=>state.cart)

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const alert =useAlert()
  const dispatch=useDispatch()
  const avatarUrl = user && user.avatar && user.avatar.url ? user.avatar.url : "/Profile.png";

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },

    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
dispatch (logout())
navigate("/login");
    alert.success("Logout Successfully");
    
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img className="speedDialIcon" src={avatarUrl} alt="Profile" />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
          tooltipOpen={window.innerWidth <= 600 ? true:false}
         
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
