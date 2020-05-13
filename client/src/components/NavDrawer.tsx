import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Login from "./auth/Login";
import Register from "./auth/Register";
const NavDrawer = ({ toggleDrawer, toggle }: any) => {
  const classes = useStyles();

  const content = (
    <div className={classes.list}>
      <List>
        <ListItem disabled>
          <Link to="/market">
            <Typography color={"textPrimary"}>Home</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/market">
            <Typography color={"textPrimary"}>Market</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/user/history">
            <Typography color={"textPrimary"}>History User</Typography>
          </Link>
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem>
          <Link to="/productcreate">
            <Typography color={"textPrimary"}>Create Product</Typography>
          </Link>
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <List>
        {/* Two cases, after auth : Records/ PerosnalInfo/ Cart | Non-Auth: Login / Register*/}
        <ListItem>
          <Link to="/auth">
            <Typography color={"textPrimary"}>Auth</Typography>
          </Link>
        </ListItem>
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

export default NavDrawer;
