import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { RootState } from "../context/store";
import { ADMIN_CREATE_PRODUCT, USER_CART, USER_HISTORY } from "../types/path";
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
import MenuIcon from "@material-ui/icons/Menu";
import NavDrawer from "./NavDrawer";
import Logout from "./auth/Logout";

const AppNavbar = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const cart = useSelector((state: RootState) => state.cart);
  const [cartLength, setCartLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [toggle, setToggle] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

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
    if (isAuthenticated) {
      let num = 0;
      if (cart.items && cart.items.length > 0) {
        num = calCartItem(cart.items);
      } else if (user.cart.length > 0) {
        num = calCartItem(user.cart);
      } else {
        num = 0;
      }
      setCartLength(num);
    }
  }, [isAuthenticated, user, cart]);

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

  const adminMenu = (
    <NavLink
      to={ADMIN_CREATE_PRODUCT}
      className="text-decoration-none text-primary"
    >
      <MenuItem onClick={handleClose}>Create Product</MenuItem>
    </NavLink>
  );

  const AuthedContent = (
    <div>
      <NavLink to={USER_CART}>
        <IconButton color="default">
          {cartLength > 0 ? ShopingCartBadge : <ShoppingCartIcon />}
        </IconButton>
      </NavLink>
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
        {user && user.role === 1 ? adminMenu : null}
        <MenuItem onClick={handleClose} disabled={true}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disabled={true}>
          My account
        </MenuItem>
        <NavLink to={USER_CART} className="text-decoration-none text-primary">
          <MenuItem onClick={handleClose}>Cart</MenuItem>
        </NavLink>
        <NavLink
          to={USER_HISTORY}
          className="text-decoration-none text-primary"
        >
          <MenuItem onClick={handleClose}>Records</MenuItem>
        </NavLink>
        <MenuItem
          onClick={handleClose}
          className="text-decoration-none text-primary"
        >
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
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
          {isAuthenticated && AuthedContent}
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

export default AppNavbar;
