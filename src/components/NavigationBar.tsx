import styles from "../styles/NavigationBar.module.css";
import linkEffectStyles from "../styles/LinkWithSlidingHoverEffect.module.css";
import boxStyles from "../styles/UtilityStyles.module.css";
import {
  CSSProperties,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import LoginLogoutButton from "./LoginLogoutButton";
import SessionIndicator from "./SessionIndicator";
import { SessionContextValue } from "next-auth/react";
import clsx from "clsx";
import NavLink from "./UserInterface/NavLink";
import { HamburgerIcon } from "./UserInterface/Icons";
import useClickOutside from "../hooks/useClickOutside";
import { useRouter } from "next/router";
import useIsNearTopOrScrollingUp from "../hooks/useIsNearTopOrScrollingUp";

type NavigationBarProps = {
  className?: string;
  sessionContext?: SessionContextValue;
};

type BurgerButtonProps = {
  handleClick?: MouseEventHandler;
  isShowMenu: boolean;
  style?: CSSProperties;
};

const BurgerButton = ({
  handleClick,
  isShowMenu,
  style,
}: BurgerButtonProps) => (
  <button
    className={clsx(styles.navItem, styles.navToggle, boxStyles["lg:hidden"])}
    onClick={handleClick}
    style={style}
  >
    <span className={styles.navToggleText}>
      {isShowMenu ? "Close Menu" : "Menu"}
    </span>
    {isShowMenu ? (
      <HamburgerIcon title="Close Menu" />
    ) : (
      <HamburgerIcon title="Menu" />
    )}
  </button>
);

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  className: outerClassName,
  sessionContext,
}) => {
  const [isShowMenu, setShowMenu] = useState(false);

  const ref = useRef<HTMLElement | null>(null);
  useClickOutside(ref, () => {
    setShowMenu(false);
  });

  const { events } = useRouter();

  const isNearTopOrScrollingUp = useIsNearTopOrScrollingUp(100);

  useEffect(() => {
    events.on("routeChangeComplete", () => {
      setShowMenu(false);
    });
  }, [events]);

  return (
    <nav
      className={clsx(styles.nav, outerClassName, {
        [styles.show]: isShowMenu,
        [styles.scrolled]: !isNearTopOrScrollingUp,
      })}
      ref={ref}
    >
      <menu className={styles.navContent}>
        <ul className={clsx(styles.navItemsMain)}>
          <li>
            <NavLink href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <title>Start</title>
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink href="/quiz/create">Create quiz</NavLink>
          </li>
          <li>
            <NavLink href="/opentrivia/demo">Demo trivia quiz</NavLink>
          </li>
          <li>
            <NavLink href="/quiz/list-own">My quizzes</NavLink>
          </li>
          <li>
            <NavLink href="/game/list-own">My games</NavLink>
          </li>
        </ul>
        <ul
          className={clsx(
            styles.navItemsSession,
            boxStyles.flex,
            boxStyles.gap
          )}
        >
          <li className={clsx(boxStyles.p2)}>
            <SessionIndicator sessionContext={sessionContext} />
          </li>
          <li className={clsx(boxStyles.p2, linkEffectStyles.link)}>
            <LoginLogoutButton
              className={clsx(
                styles.loginLogoutButton,
                boxStyles.flex,
                boxStyles.itemsCenter,
                boxStyles.gap
              )}
              sessionContext={sessionContext}
            />
          </li>
        </ul>
      </menu>
      <BurgerButton
        handleClick={() => setShowMenu(!isShowMenu)}
        isShowMenu={isShowMenu}
      />
    </nav>
  );
};

export default NavigationBar;
