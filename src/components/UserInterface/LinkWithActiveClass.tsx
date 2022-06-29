import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export type LinkWithActiveClassProps = LinkProps & {
  children?: ReactNode;
  className?: string;
  activeClassName?: string;
};

const LinkWithActiveClass = (props: LinkWithActiveClassProps) => {
  const { asPath: routerPath } = useRouter();
  const isActive = routerPath === props.href || routerPath === props.as;
  const className = clsx(props.className, {
    [props.activeClassName ?? "active"]: isActive,
  });
  return (
    <Link passHref={true} {...props}>
      <a className={className}>{props.children}</a>
    </Link>
  );
};

export default LinkWithActiveClass;
