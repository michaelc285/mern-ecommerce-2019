import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { NavLink } from "react-router-dom";
import { logout } from "../context/actions/AuthAction";
import {
  MARKET_LANDING,
  USER_HISTORY,
  SIGN_IN,
  SIGN_UP,
  USER_CART,
  PRODUCT_CONTROL_PANEL,
  USER_CONTROL_PANEL,
  ROOT,
} from "../path";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  SwipeableDrawer,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@material-ui/core/";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Collapse from "@material-ui/core/Collapse";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import FolderIcon from "@material-ui/icons/Folder";

const NavDrawer = ({ toggleDrawer, toggle }: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [accountOpen, setAccountOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleAccountClick = () => setAccountOpen(!accountOpen);
  const handleDashboardClick = () => setDashboardOpen(!dashboardOpen);
  // -----------------------------------------------------------
  // For User
  const MyAccount = (
    <Fragment>
      <ListItem button onClick={handleAccountClick}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="My Account" />
        {accountOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={accountOpen} timeout="auto" unmountOnExit>
        {/* Cart */}
        <List component="div" disablePadding>
          <NavLink exact to={USER_CART} style={{ textDecoration: "none" }}>
            <ListItem button onClick={toggleDrawer(!toggle)}>
              <ListItemIcon className="ml-4">
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" className="text-black" />
            </ListItem>
          </NavLink>

          {/* History */}
          <NavLink exact to={USER_HISTORY} style={{ textDecoration: "none" }}>
            <ListItem button onClick={toggleDrawer(!toggle)}>
              <ListItemIcon className="ml-4">
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary={"History"} className="text-black" />
            </ListItem>
          </NavLink>

          {/* Logout */}
          <ListItem
            button
            onClick={() => {
              toggleDrawer(!toggle);
              dispatch(logout());
            }}
          >
            <ListItemIcon className="ml-4">
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" className="text-black" />
          </ListItem>
        </List>
      </Collapse>
    </Fragment>
  );

  // -----------------------------------------------------------
  // For Admin
  const AdminPanel = (
    <Fragment>
      <ListItem button onClick={handleDashboardClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} className="text-black" />
        {dashboardOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={dashboardOpen} timeout="auto" unmountOnExit>
        {/* Product */}
        <List component="div" disablePadding>
          {/* User Control*/}
          <NavLink
            exact
            to={USER_CONTROL_PANEL}
            style={{ textDecoration: "none" }}
          >
            <ListItem button onClick={toggleDrawer(!toggle)}>
              <ListItemIcon className="ml-4">
                <FolderSharedIcon />
              </ListItemIcon>
              <ListItemText primary="User" className="text-black" />
            </ListItem>
          </NavLink>

          {/* Product Control */}
          <NavLink
            exact
            to={PRODUCT_CONTROL_PANEL}
            style={{ textDecoration: "none" }}
          >
            <ListItem button onClick={toggleDrawer(!toggle)}>
              <ListItemIcon className="ml-4">
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Product" className="text-black" />
            </ListItem>
          </NavLink>
        </List>
      </Collapse>
    </Fragment>
  );

  // -----------------------------------------------------------
  // For Guest
  const AuthPanel = (
    <List>
      <div className="flex">
        {/* Two cases, after auth : Records/ PerosnalInfo/ Cart | Non-Auth: Login / Register*/}
        <NavLink exact to={SIGN_IN} style={{ textDecoration: "none" }}>
          <ListItem button key={"sign_in"} onClick={toggleDrawer(!toggle)}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign In"} className="text-black" />
          </ListItem>
        </NavLink>
        <Divider orientation="vertical" flexItem />
        <NavLink exact to={SIGN_UP} style={{ textDecoration: "none" }}>
          <ListItem button key={"sign_up"} onClick={toggleDrawer(!toggle)}>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Up"} className="text-black" />
          </ListItem>
        </NavLink>
      </div>
    </List>
  );
  // -----------------------------------------------------------
  // Menu Body
  const content = (
    <div className={`${classes.list}`}>
      {/* Panel */}
      <List>
        {/* User Panel  */}
        {isAuthenticated ? MyAccount : AuthPanel}
        {/* Admin Panel */}
        {isAuthenticated && user.role === 1 && AdminPanel}
        {/* Common Pannel */}
        <NavLink exact to={ROOT} style={{ textDecoration: "none" }}>
          <ListItem button onClick={toggleDrawer(!toggle)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} className="text-black" />
          </ListItem>
        </NavLink>
        <NavLink exact to={MARKET_LANDING} style={{ textDecoration: "none" }}>
          <ListItem
            button
            key={"market-landing"}
            onClick={toggleDrawer(!toggle)}
          >
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary={"Market"} className="text-black" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor={"left"}
        open={toggle}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {content}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

// Style
const useStyles = makeStyles({
  list: {
    width: 290,
  },
  divider: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

// Redux

export default NavDrawer;
