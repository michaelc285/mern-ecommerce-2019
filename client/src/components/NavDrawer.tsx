import React from "react";
import { connect } from "react-redux";
import { logout } from "../context/actions/AuthAction";

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
  Link,
} from "@material-ui/core/";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const NavDrawer = ({ toggleDrawer, toggle, admin, isAuth }: any) => {
  const classes = useStyles();

  // Admin Only
  const adminContent = (
    <List>
      <Link
        href={ADMIN_CREATE_PRODUCT}
        className="text-decoration-none"
        color="textPrimary"
      >
        <ListItem button key={"create-product"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={"Create Product"} />
        </ListItem>
      </Link>
    </List>
  );
  // Auth = true , guest user
  const authPanel = (
    <List>
      <Link
        href={USER_HISTORY}
        className="text-decoration-none"
        color="textPrimary"
      >
        <ListItem button key={"History"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={"History"} />
        </ListItem>
      </Link>
      <Divider className={classes.divider} />
    </List>
  );

  // Auth = false
  const guestPanel = (
    <List>
      {/* Two cases, after auth : Records/ PerosnalInfo/ Cart | Non-Auth: Login / Register*/}
      <Link href={SIGN_IN} className="text-decoration-none" color="textPrimary">
        <ListItem button key={"sign_in"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign In"} />
        </ListItem>
      </Link>
      <Link href={SIGN_UP} className="text-decoration-none" color="textPrimary">
        <ListItem button key={"sign_up"} onClick={toggleDrawer(!toggle)}>
          <ListItemIcon>
            <HowToRegIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign Up"} />
        </ListItem>
      </Link>
    </List>
  );

  const content = (
    <div className={`${classes.list}`}>
      {/* Guest Panel / All User */}
      <List>
        <Link
          href={HOME_PAGE}
          className="text-decoration-none"
          color="textPrimary"
        >
          <ListItem button onClick={toggleDrawer(!toggle)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link
          href={MARKET_LANDING}
          className="text-decoration-none"
          color="textPrimary"
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
        </Link>
        {isAuth ? authPanel : null}
      </List>
      <Divider className={classes.divider} />

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
