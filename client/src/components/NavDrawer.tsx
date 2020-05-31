import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { NavLink } from "react-router-dom";
import { logout } from "../context/actions/AuthAction";
import {
  MARKET_LANDING,
  USER_HISTORY,
  HOME_PAGE,
  SIGN_IN,
  SIGN_UP,
  USER_CART,
  DASHBOARD,
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

const NavDrawer = ({ toggleDrawer, toggle }: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // -----------------------------------------------------------
  // For User
  const MyAccount = (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="My Account" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
    </List>
  );

  // -----------------------------------------------------------
  // For Admin
  const AdminPanel = (
    <NavLink exact to={DASHBOARD} style={{ textDecoration: "none" }}>
      <ListItem button onClick={toggleDrawer(!toggle)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} className="text-black" />
      </ListItem>
    </NavLink>
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
      {/* Auth Panel  */}
      {isAuthenticated ? MyAccount : AuthPanel}

      {/* Panel */}
      <List>
        {isAuthenticated && user.role === 1 && AdminPanel}
        <NavLink exact to={HOME_PAGE} style={{ textDecoration: "none" }}>
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
