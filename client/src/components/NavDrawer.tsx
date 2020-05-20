import React from "react";
import { connect } from "react-redux";
import { logout } from "../context/actions/AuthAction";
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

const NavDrawer = ({ toggleDrawer, toggle, admin, isAuth }: any) => {
  const classes = useStyles();

  // Admin Only
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
  // Auth = true , guest user
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

  // Auth = false
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
        {isAuth ? authPanel : null}
      </List>

      {/* Admin Panel */}
      {admin ? adminContent : null}
      {/* {admin ? <Divider className={classes.divider} /> : null} */}

      {/* Auth Panel */}
      {isAuth ? null : guestPanel}
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

export default connect(null, { logout })(NavDrawer);
