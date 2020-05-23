import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { NavLink } from "react-router-dom";
import {
  ADMIN_CREATE_PRODUCT,
  MARKET_LANDING,
  USER_HISTORY,
  HOME_PAGE,
  SIGN_IN,
  SIGN_UP,
} from "../context/path";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core/";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CreateIcon from "@material-ui/icons/Create";

const NavDrawer = ({ toggleDrawer, toggle }: any) => {
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // For Admin Only
  const adminContent = (
    <List>
      <NavLink
        to={ADMIN_CREATE_PRODUCT}
        className="text-decoration-none text-primary"
      >
        <ListItem button key={"create-product"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={"Create Product"} />
        </ListItem>
      </NavLink>
    </List>
  );

  // For User
  const authPanel = (
    <List>
      <NavLink to={USER_HISTORY} className="text-decoration-none text-primary">
        <ListItem button key={"History"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={"History"} />
        </ListItem>
      </NavLink>
      <Divider className={classes.divider} />
    </List>
  );

  // For Guest
  const guestPanel = (
    <List>
      {/* Two cases, after auth : Records/ PerosnalInfo/ Cart | Non-Auth: Login / Register*/}
      <NavLink to={SIGN_IN} className="text-decoration-none text-primary">
        <ListItem button key={"sign_in"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign In"} />
        </ListItem>
      </NavLink>
      <NavLink to={SIGN_UP} className="text-decoration-none text-primary">
        <ListItem button key={"sign_up"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <HowToRegIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign Up"} />
        </ListItem>
      </NavLink>
    </List>
  );

  const content = (
    <div className={`${classes.list}`}>
      {/* Guest Panel / All User */}
      <List>
        <NavLink to={HOME_PAGE} className="text-decoration-none text-primary">
          <ListItem button onClick={toggleDrawer(!toggle)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </NavLink>
        <NavLink
          to={MARKET_LANDING}
          className="text-decoration-none text-primary"
        >
          <ListItem
            button
            key={"market-landing"}
            onClick={toggleDrawer(!toggle)}
          >
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary={"Market"} />
          </ListItem>
        </NavLink>
        {isAuthenticated ? authPanel : null}
      </List>

      {/* Admin Panel */}
      {user && user.role === 1 ? adminContent : null}
      {/* {admin ? <Divider className={classes.divider} /> : null} */}

      {/* Auth Panel */}
      {isAuthenticated ? null : guestPanel}
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
    width: 250,
  },
  divider: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

// Redux

export default NavDrawer;
