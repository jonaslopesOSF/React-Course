import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliarity/Auxiliarity";

const sideDrawer = ({ closeSideDrawer, isOpened }) => {
  let attachedClases = [classes.SideDrawer];

  if (isOpened) {
    attachedClases.push(classes.Open);
  } else {
    attachedClases.push(classes.Close);
  } 

  return (
    <Aux>
      <Backdrop show={isOpened} clicked={closeSideDrawer}/>
      <div className={attachedClases.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
