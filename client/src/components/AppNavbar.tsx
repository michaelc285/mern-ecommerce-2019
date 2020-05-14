import React, { Fragment, useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { IAppNavbar, IAuthReduxProps } from "../types/interfaces";
import NavDrawer from "./NavDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Logout from "./auth/Logout";

const AppNavbar = ({ auth, cart }: any) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  // const toggle = () => setIsOpen(!isOpen);
  const open = Boolean(anchorEl);

  const [toggle, setToggle] = useState(false);

  const toggleDrawer = (action: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setToggle(action);
  };

  useEffect(() => {
    if (auth && auth.isAuthenticated) {
      setIsAuth(auth.isAuthenticated);
      let num = 0;
      if (cart.items && cart.items.length > 0) {
        num = calCartItem(cart.items);
      } else if (auth.user.cart.length > 0) {
        num = calCartItem(auth.user.cart);
      } else {
        num = 0;
      }
      setCartLength(num);
    } else {
      setIsAuth(false);
    }
  }, [auth, cart]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ShopingCartBadge = (
    <Badge badgeContent={cartLength} color="error">
      <ShoppingCartIcon />
    </Badge>
  );

  const AuthedContent = (
    <div>
      <Link to="/user/cart">
        <IconButton color="default">
          {cartLength > 0 ? ShopingCartBadge : <ShoppingCartIcon />}
        </IconButton>
      </Link>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disabled={true}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disabled={true}>
          My account
        </MenuItem>
        <MenuItem onClick={handleClose}>Cart</MenuItem>
        <MenuItem onClick={handleClose}>Records</MenuItem>
        <MenuItem onClick={handleClose}>
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color={"default"}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <NavDrawer toggleDrawer={toggleDrawer} toggle={toggle} />
          <Typography variant="h6" className={classes.title}>
            M's Market
          </Typography>
          {isAuth && AuthedContent}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const calCartItem = (items: any[]) => {
  let num = 0;
  items.forEach((item) => (num += item.quantity));
  return num;
};

// Style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
// Redux
const mapStateToProps = (state: any) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, null)(AppNavbar);
