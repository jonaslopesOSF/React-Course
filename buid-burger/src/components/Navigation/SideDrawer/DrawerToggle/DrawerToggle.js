import React from "react";
import classes from "./DrawerToggle.css";

const drawerToggle = ({ clicked }) => (
  <div onClick={clicked} className={classes.DrawerToggle}>
    <div className={classes.bar1} />
    <div className={classes.bar2} />
    <div className={classes.bar3} />
  </div>
);

export default drawerToggle;
