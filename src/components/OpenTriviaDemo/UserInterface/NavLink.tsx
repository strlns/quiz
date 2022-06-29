import clsx from "clsx";
import styles from "../../styles/NavigationBar.module.css";
import linkEffectStyles from "../../styles/LinkWithSlidingHoverEffect.module.css";
import LinkWithActiveClass, {
  LinkWithActiveClassProps,
} from "./LinkWithActiveClass";

const NavLink = (props: Omit<LinkWithActiveClassProps, "activeClassName">) => (
  <LinkWithActiveClass
    className={clsx(styles.navItem, linkEffectStyles.link)}
    activeClassName={linkEffectStyles.active}
    {...props}
  />
);

export default NavLink;
