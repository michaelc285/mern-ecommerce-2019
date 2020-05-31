import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../context/store";
import { USER_CART } from "../path";
import { IconButton, Badge, AppBar, Toolbar } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import NavDrawer from "./NavDrawer";

const AppNavbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const cart = useSelector((state: RootState) => state.cart);
  const [cartLength, setCartLength] = useState(50);
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

  //------------------------------------------
  // Authed Content
  const ShopingCartBadge = (
    <Badge badgeContent={cartLength} color="error">
      <ShoppingCartIcon />
    </Badge>
  );

  const AuthedContent = (
    <div>
      <NavLink to={USER_CART}>
        <IconButton color="default">{ShopingCartBadge}</IconButton>
      </NavLink>
    </div>
  );

  return (
    <AppBar position={"static"}>
      <Toolbar>
        <div className="flex-grow-1">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <NavDrawer toggleDrawer={toggleDrawer} toggle={toggle} />
        </div>

        {isAuthenticated && AuthedContent}
      </Toolbar>
    </AppBar>
  );
};

const calCartItem = (items: any[]) => {
  let num = 0;
  items.forEach((item) => (num += item.quantity));
  return num;
};

export default AppNavbar;
