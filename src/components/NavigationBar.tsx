import styles from "../styles/NavigationBar.module.css";
import linkEffectStyles from "../styles/LinkWithSlidingHoverEffect.module.css";
import boxStyles from "../styles/UtilityStyles.module.css";
import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import LoginLogoutButton from "./LoginLogoutButton";
import SessionIndicator from "./SessionIndicator";
import { SessionContextValue } from "next-auth/react";
import useResizeObserver from "../hooks/useResizeObserver";
import { debounce } from "lodash-es";
import clsx from "clsx";
import NavLink from "./UserInterface/NavLink";
import { HamburgerIcon } from "./Icons/Icons";
import useClickOutside from "../hooks/useClickOutside";
import { useRouter } from "next/router";

type NavigationBarProps = {
  className?: string;
  sessionContext?: SessionContextValue;
};

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  className: outerClassName,
  sessionContext,
}) => {
  const [isShowMenu, setShowMenu] = useState(false);

  const [isNearTopOrScrollingUp, setIsNearTopOrScrollingUp] = useState(false);

  const [navHeight, setNavHeight] = useState(0);

  const resizeCallback: ResizeObserverCallback =
    debounce<ResizeObserverCallback>((entries) => {
      if (entries.length) {
        const height = entries[0].target.clientHeight;
        setNavHeight(height);
        document.documentElement.style.setProperty(
          "--nav-height",
          `${height}px`
        );
      }
    }, 1000);

  const [callbackRef] = useResizeObserver(resizeCallback);
  const ref = useRef<HTMLElement | null>(null);

  useClickOutside(ref, () => {
    setShowMenu(false);
  });

  useEffect(() => {
    let oldScrollY = window.scrollY;
    const listener: EventListener = debounce(() => {
      const { scrollY } = window;
      setIsNearTopOrScrollingUp(
        scrollY < oldScrollY || scrollY < Math.max(navHeight, 100)
      );
      oldScrollY = scrollY;
    }, 25);
    window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, [navHeight]);

  const { events } = useRouter();

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
      ref={(element) => {
        ref.current = element;
        callbackRef(element);
      }}
    >
      <menu className={styles.navContent}>
        <ul
          className={clsx(
            styles.navItemsMain,
            boxStyles.flex,
            boxStyles.itemsCenter,
            boxStyles.flexWrap
          )}
        >
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
          <>
            <li>
              <NavLink href="/create-quiz">Create quiz</NavLink>
            </li>
          </>
          <li>
            <NavLink href="/opentrivia/demo">Demo trivia quiz</NavLink>
          </li>
          <li>
            <NavLink href="/list/mine">Mine</NavLink>
          </li>
          <li>
            <NavLink href="/list/games">My games</NavLink>
          </li>
        </ul>
        <ul
          className={clsx(
            styles.navItemsSession,
            boxStyles.flex,
            boxStyles.gap
          )}
        >
          <li className={clsx(styles.navItem)}>
            <SessionIndicator sessionContext={sessionContext} />
          </li>
          <li className={clsx(styles.navItem, linkEffectStyles.link)}>
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
      <button
        className={clsx(
          styles.navItem,
          styles.navToggle,
          boxStyles["lg:hidden"]
        )}
        onClick={() => setShowMenu(!isShowMenu)}
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
    </nav>
  );
};

export default NavigationBar;
