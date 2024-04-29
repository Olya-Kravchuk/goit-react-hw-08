import css from "./Navigation.module.css"

import { NavLink } from 'react-router-dom';

import clsx from "clsx";

const Navigation = () => {
    const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, {
    [css.active]: isActive,
  });
  return (
    <nav className={css.nav}>
      <NavLink className={getNavLinkClassName} to="/">Home</NavLink>
      <NavLink className={getNavLinkClassName} to="/register">register</NavLink>
      <NavLink className={getNavLinkClassName} to="/login">login</NavLink>
      <NavLink className={getNavLinkClassName} to="/contacts">contacts</NavLink>
      
    </nav>
  )
}

export default Navigation